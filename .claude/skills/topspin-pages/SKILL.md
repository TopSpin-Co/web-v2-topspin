---
name: topspin-pages
description: >
  Genera nuevas páginas HTML para el sitio web de TopSpin Co manteniendo consistencia
  con el design system, navbar, footer y convenciones del proyecto. Usa esta skill
  siempre que se pida crear, completar o rediseñar una página HTML del sitio
  (lgaas, roaas, crm-admin, about, blog, case, contacto, etc.).
---

# TopSpin Pages — Creación de Páginas Consistentes

Esta skill asegura que cada página nueva o editada del sitio TopSpin Co siga las
convenciones establecidas en el proyecto.

## Estructura base de toda página

Cada página HTML debe incluir:

1. **DOCTYPE y meta tags** — `lang="es"`, charset UTF-8, viewport responsive
2. **Google Fonts** — Preconnect + carga de Playfair Display e Inter
3. **CSS** — Link a `style.css` con cache buster (`?v=N`)
4. **Navbar** — Idéntica a la de index.html (sticky, dropdown de servicios, botón idioma)
5. **Contenido principal** — Secciones numeradas con comentarios (`<!-- 01 - Nombre -->`)
6. **Footer** — Idéntico al de index.html
7. **Script** — Link a `script.js`

## Variables CSS disponibles

Usar siempre las custom properties definidas en `:root` de style.css:

- Colores: `--accent`, `--accent-hover`, `--bg-primary`, `--bg-secondary`, `--bg-tertiary`
- Texto: `--text-primary`, `--text-secondary`
- Bordes: `--border`

## Clases utility reutilizables

- Spacing: `.mt-sm`, `.mt-md`, `.mt-lg`, `.p-md`, `.p-lg`
- Layout: `.w-100`, `.text-center`, `.bg-primary`, `.bg-secondary`, `.bg-tertiary`
- Cards: `.card-feature`, `.card-service`, `.card-testimonial`, `.card-team`, `.card-article`
- Split layout: `.layout-split` + `.split-header` + `.split-content`

## Tono de marca

- Directo, profesional pero cercano
- Sin buzzwords vacíos
- Enfocado en resultados (revenue, pipeline, reuniones)
- CTAs claros: "Agendar Llamada", "Empezar Ahora", "Quiero más reuniones"

## Checklist antes de entregar

- [ ] Navbar y footer idénticos a index.html
- [ ] Secciones numeradas con comentarios HTML
- [ ] Solo clases CSS existentes o nuevas en style.css (no inline styles)
- [ ] Responsive: verificar grid en mobile
- [ ] Links internos correctos entre páginas
- [ ] Idioma: todo el contenido en español
