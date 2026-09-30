# commonerrors.md — memoria de errores comunes de este proyecto

> Se lee al inicio de cada sesión. Se añaden entradas al final de una tarea
> si hubo algún atasco no trivial (síntoma, causa, solución). Formato: bullet conciso.

## Errores detectados

- **El formulario enviaba a 404 en producción** (síntoma: "Enviar solicitud de cita" → "Page not found" de Netlify con GET a `/contacto/` respondiendo 200). Causa: la UI nueva de Netlify no activa la **form detection** por defecto en proyectos creados con Drop, así que el POST no se intercepta (un POST a una ruta estática sin formulario registrado = 404). Solución: Forms → activar "form detection" y **volver a publicar** (Project overview → "choose a folder" con `dist/`) para que Netlify escanee el HTML y registre el formulario. Verificado después: POST → 200 "Thank you", envíos visibles en el panel.
- **404 aparente recién desplegado/renombrado el sitio en Netlify** (síntoma: "Pedir cita" → 404 tras el Drop). Causa: el subdominio nuevo/renombrado sigue propagando y recacheando ~1 min tras publicar. Solución: esperar y verificar con `curl -s -o /dev/null -w "%{http_code}" <url>/path/` antes de asumir que falta una página. (En este caso las 4 páginas respondían 200 al retest.)
- **El sitio crea 🔒 Private por defecto** en la UI nueva de Netlify (401 en todas las rutas). Solución: botón "Make public" del Project overview antes de compartir la URL.

- **Captura `fullPage` del navegador interno (IAB) rota en páginas largas** (sintoma: la cabecera sticky y el hero se repiten verticales en el PNG). Causa: el compositor de tiles del capture interno re-renderiza el tile superior. Solución: capturar por `scrollTo` + tiles de viewport sin `fullPage` y coser con `sharp` siguiendo un manifiesto con los `scrollY` reales.
- **`scroll-behavior: smooth` rompe el scroll programático de las capturas** (los tiles salen a mitad de animación / sin moverse). Solución: antes de capturar, `document.documentElement.style.scrollBehavior = "auto"` y usar `scrollTo({ behavior: "instant" })`.
- **`window.scrollY` puede volver fraccional en el IAB** (2186.6667 ≠ 2187): compara con tolerancia (±1 px), no con igualdad exacta.
- **Imágenes `loading="lazy"` a medio decodificar en capturas** (foto del equipo vacía por arriba en móvil). Solución: pasadillo de scroll antes de capturar + `waitForTimeout` largo y re-verifica; no es un bug de layout.
- **`import sharp` en un `.mjs` fuera del proyecto falla** (ERR_MODULE_NOT_FOUND): ESM resuelve paquetes desde la carpeta del script; coloca el script dentro del proyecto (node_modules del repo).
- **`join()` con un segmento ABSOLUTO como argumento produce una ruta absurda** (`scripts\\..\\C:/Users/...` → "no existe"). En Node, para aceptar rutas absolutas O relativas usa `resolve(base, arg)`, no `join`. (Golpeado al pasarle a un script el arg `/tmp/...` desde Git Bash: node.exe recibe la conversión MSYS bien hecha, pero el `join` la deshace.)
- **Clic real de Playwright colgado sobre el botón del menú móvil (header con SVG)** aunque el elemento es clicable según `elementFromPoint`. Usar `getByRole` si responde; si no, `evaluate(() => btn.click())` — el listener es estándar y se verifica con estado (`aria-expanded`, clase `hidden`) o captura.