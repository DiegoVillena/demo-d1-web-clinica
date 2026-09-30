import type { APIRoute } from "astro";
import { SITE } from "../data/site";

const paginas = ["", "/servicios/", "/la-clinica/", "/contacto/"];
const hoy = new Date().toISOString().slice(0, 10);

export const GET: APIRoute = () =>
  new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paginas
  .map((p) => `  <url>\n    <loc>${SITE.url}${p}</loc>\n    <lastmod>${hoy}</lastmod>\n  </url>`)
  .join("\n")}
</urlset>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );