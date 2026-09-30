# AGENTS.md — demo D1: Web de clínica dental

## Qué es

Web estática de **4 páginas** para la *"Clínica Dental Serrano"* de Albacete — **negocio 100% ficticio**, declarado en el footer y en el README. Es la **demo D1** de *Operación Freelancer*: la web que se enseña a clientes potenciales del servicio **S1** (*"así entregamos una web de negocio"*).

Ficha de requisitos congelada: `C:\Users\Diego\Desktop\OperacionFreelancer\plantillas\ficha-d1.md` (cualquier cambio fuera de la ficha = ficha aparte).

## Stack

- **Astro (estático)** + **Tailwind CSS** (v4, vía `@tailwindcss/vite`) — sin CMS, sin backend.
- **Netlify Forms** para el contacto (sin JS ni backend: atributo `data-netlify` + honeypot).
- Sin fuentes externas (system font stack), sin librerías JS de UI.
- Imágenes en `src/assets/` optimizadas por Astro (`astro:assets`) a WebP con lazy loading al hacer build.

## Cómo se corre

```bash
npm install        # la primera vez
npm run dev        # desarrollo en http://localhost:4321
npm run build      # genera dist/ (lo que se sube a Netlify)
npm run preview    # sirve dist/ en local
```

## Estructura

```
src/
├── assets/            # fotos del banco de imágenes (originales, Astro las optimiza)
├── components/        # Header, Footer
├── data/site.ts       # TODO lo que cambia por cliente: nombre, URL, dirección, teléfono, horario
├── layouts/BaseLayout.astro   # <head> SEO/OG/JSON-LD, skip link, menú móvil
├── pages/             # index.astro · servicios.astro · la-clinica.astro · contacto.astro
│   └── (robots.txt.ts, sitemap.xml.ts)  # generados desde site.ts
├── styles/global.css  # import de Tailwind
public/
├── _headers           # cabeceras de seguridad de Netlify
├── favicon.svg
docs/capturas/        # capturas móvil/escritorio (se usan en el README)
```

## Convenciones del proyecto

- Copy en español, **sin lorem ipsum**; negocio y personas 100% ficticias (no usar datos reales).
- URLs internas con barra final (`/servicios/`) y coherentes con `sitemap.xml` / canonical.
- La URL canónica pública vive **solo** en `src/data/site.ts` (la usan metas, JSON-LD, sitemap y robots).
- Rama git por tarea; **commits solo con permiso de Diego**.
- Cabeceras de seguridad en `public/_headers`: X-Frame-Options, nosniff, Referrer-Policy. HTTPS forzado lo hace Netlify de serie.
- **Seguridad de serie**: dependencias FIJADAS por versión exacta (sin `^`/`~`); nada de terceros (sin fonts externas, analytics ni CDNs — todo CSS/JS self-hosted; el mapa es iframe de OSM sin keys). `npm run build` termina con `scripts/qa-seguro.mjs`, que rompe el build si en `dist/` hay `.env`/keystores/sourcemaps, secretos literales o recursos remotos de `<script>`/`stylesheet`/`@import`.

## Estado actual

- **DEMO D1 TERMINADA (checklist ficha §6 completo), en producción y fusionada**:
  - Producción: https://d1-clinica-serrano.netlify.app — Netlify Drop, dominio renombrado;
    verificado en vivo: 4 páginas a 200, HTTPS forzado, headers de seguridad, sitemap,
    JSON-LD y formulario funcionando (POST→200; envíos en el panel de Netlify Forms tras
    activar "Form detection" — detalles y síntomas en `commonerrors.md`).
  - Ojeada de Diego en móvil ✓ (30/09/2026).
  - **Repo GitHub**: https://github.com/DiegoVillena/demo-d1-web-clinica (público,
    rama por defecto `main`; la demo D1 se fusiona a `main` el 30/09/2026).
- Capturas desktop/móvil de las 4 páginas en `docs/capturas/` (generadas con tile-capture +
  sharp; ver `commonerrors.md` para cómo reproducirlas).
- QA de ficha §6 superado (build limpio, 0 lorem, form attrs en dist, responsivo verificado).
- Refuerzo de seguridad de serie: versiones exactas (astro 5.18.2, tailwindcss 4.3.3,
  @tailwindcss/vite 4.3.3), `postbuild` con `scripts/qa-seguro.mjs` (verificado en ambos
  sentidos: dist real pasa; scratch sembrado con .env/secreto/sourcemap/CSS de terceros falla).
- Conectar GitHub ↔ Netlify (auto-deploy en push): decidimos NO hacerlo de momento (30/09/2026);
  el deploy se repite arrastrando `dist/` (ver `GUÍA.md`).