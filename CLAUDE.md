# TopSpin Co — Contexto del Proyecto

## Qué es TopSpin Co

TopSpin Co es una agencia B2B española que ofrece servicios de generación de pipeline y revenue para empresas B2B en España. No es una agencia de marketing tradicional: se posiciona como una extensión del equipo de ventas del cliente, enfocada en resultados de revenue, no vanity metrics.

**Claim principal:** "La mayoría de agencias generan leads. Pocas generan revenue."

**Propuesta de valor:** Transformar el proceso de ventas B2B de principio a fin — desde prospección outbound hasta cierre — generando pipeline real y revenue predecible.

## Servicios (3 pilares)

1. **LGaaS (Lead Generation as a Service)** — Generación de reuniones cualificadas mediante outbound multicanal (email, LinkedIn, llamadas). IA-powered. El equipo del cliente solo cierra.
2. **ROaaS (Revenue Operations as a Service)** — Alineación de marketing, ventas y datos. Pipeline predecible. Decisiones basadas en datos.
3. **CRM Admin (HubSpot gestionado)** — Configuración, mantenimiento y optimización de HubSpot sin depender del equipo técnico del cliente.

Los tres servicios están diseñados para trabajar juntos como sistema, pero el cliente puede empezar por uno.

## Target / ICP

- Empresas B2B en España
- Que necesitan reuniones cualificadas con decisores
- Equipos de ventas que pierden tiempo prospectando
- Usuarios de HubSpot que no lo aprovechan
- Quieren escalar sin contratar SDRs, RevOps o CRM admins internos

## Stack Tecnológico

**Prospección y Outbound:** Apollo, Clay, Instantly, Smartlead, LinkedIn Sales Navigator
**CRM y RevOps:** HubSpot, Salesforce
**IA integrada en cada workflow** — automatizan lo repetitivo para focalizar en lo estratégico.

## Proceso de trabajo (timeline)

- **Semana 1:** Diagnóstico y estrategia (ICP, propuesta de valor, stack actual)
- **Semana 2:** Setup e infraestructura (herramientas, dominios, secuencias, CRM)
- **Semana 3:** Lanzamiento de campañas outbound + reportes semanales
- **Mes 2+:** Optimización y escala iterativa

## Identidad Visual y Design System

### Colores
- **Accent/Primario:** `#e65926` (naranja del logo)
- **Accent hover:** `#cc4f22`
- **BG Primary:** `#fdfbf7`
- **BG Secondary:** `#ffffff`
- **BG Tertiary:** `#f4f2ec`
- **Text Primary:** `#1a1a1a`
- **Text Secondary:** `#5c5c5c`
- **Border:** `#e5e5e5`
- **Footer:** fondo `#1a1a1a`, texto `#999`, links hover `#fff`

### Tipografías
- **Headings:** `Playfair Display` (serif) — pesos 400, 600, italic
- **Body:** `Inter` (sans-serif) — pesos 300, 400, 500, 600
- Google Fonts (preconnect a fonts.googleapis.com y fonts.gstatic.com)

### Estilo visual
- Tema claro únicamente (sin dark mode)
- Botón de idioma (bandera española) en navbar como placeholder para futuro selector de idioma
- Cards con bordes sutiles, sombras suaves, hover con translateY(-5px)
- Layout split (1/3 + 2/3) para secciones como FAQ, contacto, "para quién"
- Grid responsive: grid-3 (minmax 300px), grid-4 (minmax 200px)
- Botones con border-radius: 4px, transición suave
- Timeline horizontal (vertical en mobile)
- Marquee animado para logos de clientes
- Accordion para FAQ
- Navbar sticky con dropdown para servicios

## Estructura de Archivos

```
/
├── index.html          ← Home completa (13 secciones)
├── style.css           ← CSS completo con variables y responsive
├── script.js           ← Accordion FAQ + nav slider + mobile menu
├── lgaas.html          ← Página LGaaS (placeholder "Not done yet")
├── roaas.html          ← Página ROaaS (placeholder "Not done yet")
├── crm-admin.html      ← Página CRM Admin (placeholder "Not done yet")
├── about.html          ← Sobre Nosotros (prototipo básico)
├── blog.html           ← Blog (prototipo con cards placeholder)
├── case.html           ← Casos de Éxito (placeholder)
├── contacto.html       ← Contacto (formulario + FAQ + info de contacto)
├── privacy-policy.html ← Política de Privacidad (placeholder)
├── cache_buster.py     ← Script para cache-bust del CSS
├── update_nav.py       ← Script para actualizar nav en todos los HTML
├── assets/
│   └── images/
│       ├── logo.png
│       ├── day_style.png
│       └── night_style.png
└── TopSpin_Home_Contenido.pdf  ← Documento de contenido/briefing original
```

## Estado del Proyecto

**Completado:**
- Home page (index.html) con 13 secciones completas pero con placeholders [X] en métricas y testimonios
- Design system completo (CSS con variables, solo light mode)
- Navbar con dropdown de servicios
- Footer consistente en todas las páginas
- Git inicializado con historial de commits

**En progreso / Pendiente:**
- Páginas de servicios individuales (lgaas, roaas, crm-admin) — solo tienen placeholder
- Case studies, blog posts, recursos, how-to, comparativa — solo placeholders
- Privacy policy — placeholder
- About page — prototipo básico sin datos reales
- Métricas reales (actualmente son [X])
- Testimonios reales (actualmente son placeholders)
- Logos de clientes reales (actualmente son ficticios)
- Datos del equipo (actualmente son [Nombre])
- Mobile hamburger menu (nav-links se oculta en mobile sin alternativa)
- Formularios sin backend real

## Convenciones de Código

- HTML semántico con secciones numeradas (<!-- 01 - Hero -->, etc.)
- CSS con variables custom properties en :root
- Clases utility: `.mt-sm`, `.mt-md`, `.mt-lg`, `.p-md`, `.p-lg`, `.w-100`, `.text-center`, `.bg-primary/secondary/tertiary`
- Naming: `.card-feature`, `.card-service`, `.card-testimonial`, `.card-team`, `.card-article`
- Layout: `.layout-split` + `.split-header` + `.split-content`
- Todos los HTML comparten el mismo header (navbar) y footer
- Cache busting via query param: `style.css?v=2`
- Idioma: español (lang="es"), contenido en español

## Tono y Voz de Marca

- Directo, profesional pero cercano
- Sin florituras ni buzzwords vacíos
- Enfocado en resultados tangibles (revenue, pipeline, reuniones)
- Diferenciación clara: "No somos una plataforma. Somos un equipo."
- Confianza sin arrogancia
- Llamadas a la acción claras: "Agendar Llamada", "Empezar Ahora", "Quiero más reuniones"

## Contenido del PDF (Briefing Original)

El PDF `TopSpin_Home_Contenido.pdf` contiene el briefing completo de contenido para la home page con estructura de 13 secciones:
1. Hero, 2. Métricas, 3. Logos, 4. Why TopSpin, 5. Servicios, 6. Para Quién, 7. Cómo Trabajamos, 8. Testimonios, 9. About Us, 10. Stack, 11. Blog, 12. FAQ, 13. Contacto

Incluye copywriting detallado, microcopy, CTAs, estructura de FAQ (8 preguntas), y especificaciones de diseño para cada sección.

## Skills del Proyecto

Las skills locales del proyecto están en `.claude/skills/`. Cada skill es una carpeta con un archivo `SKILL.md` que contiene instrucciones especializadas para tareas recurrentes.

### Estructura

```
.claude/skills/
└── topspin-pages/
    └── SKILL.md     ← Cómo crear páginas HTML consistentes
```

### Cómo añadir una nueva skill

1. Crear una carpeta dentro de `.claude/skills/` con el nombre de la skill
2. Dentro, crear un `SKILL.md` con frontmatter YAML (`name`, `description`) y las instrucciones en Markdown
3. Opcionalmente, añadir subcarpetas: `scripts/`, `references/`, `assets/`

### Skills disponibles

- **topspin-pages** — Genera páginas HTML manteniendo consistencia con el design system, navbar, footer y convenciones del proyecto

## Git

- Rama principal: `main`
- Remote configurado (origin)
- Commits descriptivos en inglés
