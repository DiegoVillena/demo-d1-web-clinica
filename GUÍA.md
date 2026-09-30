# GUÍA — cómo administrar tu web (Clínica Dental Serrano)

> Demo con **negocio ficticio**: nombre, dirección, teléfono y personas son inventados.
> Esta página dice dónde se cambia cada cosa para un caso real. Todo se edita en 2 archivos.

## 1. Dónde cambiar los datos del negocio

Un solo archivo concentra casi todo: **`src/data/site.ts`**

| Qué cambiar | Dónde |
| --- | --- |
| Nombre de la clínica | `SITE.name` y `SITE.corto` |
| Dirección y ciudad | `SITE.direccion` |
| Lugar del mapa | `SITE.geo` (latitud/longitud; en [openstreetmap.org](https://www.openstreetmap.org) clic derecho → "mostrar dirección") |
| Teléfono | `SITE.telefono` (y `telefonoHref` sin espacios ni guiones) |
| Horario visible | `SITE.horario` |
| Horario para Google (JSON-LD) | `HORARIO_JSONLD` (Lunes=Monday… en inglés) |
| URL pública | `SITE.url` — ver sección 4 |

Los **tratamientos** (títulos y descripciones) están en **`src/data/services.ts`**.
Los **textos de cada página** (hero, "cómo trabajamos", opiniones) están en `src/pages/*.astro`, con el texto a la vista.

## 2. Cómo cambiar o añadir fotos

1. Sustituye (o añade) los `.jpg` en `src/assets/` **con el mismo nombre** (`hero.jpg`, `galeria-1.jpg`… `equipo-1.jpg`…).
2. Si cambias el nombre, ajusta el `import` arriba del `.astro` de la página correspondiente.
3. La web se optimiza sola: al compilar, Astro genera WebP comprimidos con lazy loading.

Los retratos de equipo: fotos de banco libre (Pexels); **sustitúyelas por fotos reales del equipo**.

## 3. Cómo publicar cambios

```bash
npm run build    # regenera dist/
```

- Si el sitio va **unido a GitHub** (recomendado): cada push a `main` publica solo en Netlify.
- Si se usó **Netlify Drop**: vuelve a arrastrar la carpeta `dist/` a tu sitio en app.netlify.com.

## 4. Cómo poner tu propio dominio

1. En Netlify: **Site configuration → Domains → Add a domain**, escribe tu dominio y sigue sus pasos.
2. Apunta DNS (Netlify te muestra los registros; si lo registras en Netlify, se configura solo).
3. Asegura el certificado HTTPS: **Domain management → HTTPS**, activa el certificado de Netlify (gratis).
4. **Importante**: edita `SITE.url` en `src/data/site.ts` con tu dominio definitivo y republish —
   de ahí salen las canónicas, el Open Graph, el `sitemap.xml` y el `robots.txt` (Google lo lee).

## 5. El formulario de contacto

No necesita backend: llega como **Netlify Forms**.

- Ver/enviar emails: app.netlify.com → tu sitio → **Forms** (activa "email notifications" para recibirlos por correo).
- Al enviar, la persona ve la página genérica de Netlify ("Thank you!"). Si la quieres con tu propio diseño (/gracias/), es un añadido aparte que se cotiza.
- El campo "No rellenes este campo si eres humano" **no debe quitarse**: bloquea el spam.
- Para recibirlo por email directo: Forms → del formulario → Settings → Email notification.

## 6. Resumen rápido

```bash
npm install → npm run dev    # probar en local
npm run build                # generar dist/ para publicar
```

- Textos/datos: `src/data/site.ts`, `src/data/services.ts`, `src/pages/*.astro`
- Fotos: `src/assets/`
- Publicar: push a GitHub (auto si Netlify está unido) o arrastrar `dist/`
- Dominio: Netlify → Domains + paso 4, luego editar `SITE.url` y rebuild