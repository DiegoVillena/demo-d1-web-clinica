/**
 * QA de seguridad "de serie" — corre con postbuild tras `npm run build`.
 * Revisa exclusivamente lo que se despliega (dist/):
 *   1) Ni .env, ni llaves/keystores, ni sourcemaps entran al despliegue.
 *   2) Sin secretos incrustados en el código ni scripts/CSS servidos por terceros:
 *      todo el CSS/JS es self-hosted (el mapa es un iframe de OpenStreetMap, sin API keys).
 * Sale con código 1 si encuentra algo: el build no queda "verde" con el despliegue en riesgo.
 */
import { readdir, readFile } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const dirArg = process.argv[2] ?? "dist";
const dir = resolve(dirname(fileURLToPath(import.meta.url)), "..", dirArg);

// Archivos que NO deben subirse jamás
const NOMBRES_PROHIBIDOS = [
  { nombre: "archivo de entorno", re: /(?:^|\.|_)(?:env)(?:\..+)?$/i },
  { nombre: "clave/keystore", re: /\.(?:pem|key|pfx|p12|jks|keystore)$/i },
  { nombre: "sourcemap (expone el fuente)", re: /\.map$/i },
  { nombre: "clave privada ssh", re: /id_rsa/i },
  { nombre: "base de datos", re: /\.sqlite$/i },
];

// Secretos típicos incrustados (patrones conservadores para HTML/CSS/JS generados)
const PATRONES_SECRETO = [
  { nombre: "clave de Google (AIza...)", re: /AIza[0-9A-Za-z_-]{20,}/ },
  { nombre: "clave OpenAI/Stripe (sk-...)", re: /(?:sk-(?:proj|svcacct|admin)-[0-9A-Za-z_-]{10,})|(?:sk|pk|rk)_(?:live|test|prod)_[0-9A-Za-z_-]{10,}/ },
  { nombre: "token de Slack (xox...)", re: /xox[baprs]-[0-9A-Za-z_-]{10,}/ },
  { nombre: "token de GitHub (ghp_...)", re: /gh[pusr]_[0-9A-Za-z]{20,}/ },
  { nombre: "API key con valor literal", re: /(?:api[_-]?key)["']?\s*[:=]\s*["'][0-9A-Za-z_-]{16,}["']/i },
];

// Cualquier script / hoja de estilos servida desde fuera del propio dominio
const PATRONES_TERCEROS = [
  { nombre: "<script> con src externo", re: /<script[^>]*\ssrc=["'](?:https?:)?\/\/[^"']+["']/i },
  { nombre: "stylesheet con URL externa", re: /<link[^>]*\srel=["']stylesheet["'][^>]*\shref=["'](?:https?:)?\/\/[^"']+["']/i },
  { nombre: "CSS @import externo", re: /@import\s+(?:url\()?["']?(?:https?:)?\/\/[^;'")\s]+/i },
];

const ES_TEXTO = (ficha) => /\.(?:html?|js|mjs|cjs|css|json|svg|txt|xml)$/i.test(ficha);

const hallazgos = [];
let revisados = 0;

let entradas;
try {
  entradas = await readdir(dir, { recursive: true, withFileTypes: true });
} catch {
  console.error(`QA de seguridad: no existe ${dirArg}/ (o no es legible) — ejecuta "npm run build" antes.`);
  process.exit(1);
}

for (const entrada of entradas) {
  if (!entrada.isFile()) continue; // directorios y enlaces no se escanean por contenido
  const rutaAbs = resolve(entrada.parentPath, entrada.name);
  const rutaRel = relative(dir, rutaAbs);
  revisados++;

  const ficha = entrada.name;
  for (const { nombre, re } of NOMBRES_PROHIBIDOS) {
    if (re.test(ficha)) hallazgos.push(`archivo prohibido (${nombre}): ${rutaRel}`);
  }
  if (!ES_TEXTO(ficha)) continue;

  const contenido = await readFile(rutaAbs, "utf8");
  for (const { nombre, re } of PATRONES_SECRETO) {
    if (re.test(contenido)) hallazgos.push(`posible secreto (${nombre}): ${rutaRel}`);
  }
  for (const { nombre, re } of PATRONES_TERCEROS) {
    if (re.test(contenido)) hallazgos.push(`terceros (${nombre}): ${rutaRel}`);
  }
}

if (hallazgos.length > 0) {
  console.error(`\nQA de seguridad FALLÓ en ${dirArg}/ (${hallazgos.length} hallazgo/s):`);
  for (const h of hallazgos) console.error(`  - ${h}`);
  console.error("\nResuelve los hallazgos antes de publicar en Netlify.");
  process.exit(1);
}

console.log(`QA de seguridad OK — ${revisados} archivos revisados en ${dirArg}/: sin .env, sin secretos, sin scripts/CSS de terceros.`);