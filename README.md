# mi-ui-kit

Portafolio de **componentes de interfaz** en **Vue 3**, inspirado en el enfoque de [shadcn/ui](https://ui.shadcn.com): componentes reutilizables, variantes con **CVA**, tokens de diseño con **Tailwind CSS** y patrones accesibles (diálogos, tabs, tooltips, toasts).

Incluye un **layout tipo dashboard** (sidebar + header con modo claro/oscuro), una **demo de pantalla** con datos ficticios y una **galería UI Kit** para revisar componentes de forma aislada.

> **Nota de confidencialidad:** este repositorio **no** contiene aplicaciones completas de empleadores (ERP, APIs internas, etc.) ni datos reales. Solo muestra patrones y capa UI de autoría personal. En proyectos productivos con **React** aplico la misma línea (Radix/shadcn, design tokens, composición); aquí la referencia está en Vue 3.

---

## Tabla de contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Rutas de la aplicación](#rutas-de-la-aplicación)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Variables de entorno](#variables-de-entorno)
- [Componentes incluidos](#componentes-incluidos)
- [Autor](#autor)
- [Licencia y créditos](#licencia-y-créditos)

---

## Características

- **App shell:** navegación lateral, cabecera con badge “Datos demo”, alternancia tema claro/oscuro.
- **Vista Demo (`/demo`):** listado en tabla (JSON mock), acciones con diálogo, menú contextual, notificaciones toast y confirmación destructiva.
- **Vista UI Kit (`/ui-kit`):** showcase de botones, formularios, feedback y componentes compuestos.
- **Composables:** `useAlertDialog`, `useToast`, `useTheme`.
- **Build listo** para despliegue estático (Vite → carpeta `dist`).

---

## Tecnologías

| Tecnología | Uso |
|------------|-----|
| Vue 3 | Composition API, `<script setup>` |
| Vite | Desarrollo y build |
| Vue Router | Rutas `/demo` y `/ui-kit` |
| Tailwind CSS v4 | Estilos y tokens (incl. modo oscuro) |
| class-variance-authority | Variantes de componentes |
| @headlessui/vue | Tabs y piezas accesibles |
| @floating-ui/vue | Posicionamiento (popover, tooltip) |
| @vueuse/core | Utilidades reactivas |
| lucide-vue-next | Iconografía |

---

## Requisitos previos

- **Node.js** 18 o superior (recomendado 20+)
- **npm** (o pnpm / yarn)

---

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/TU-USUARIO/mi-ui-kit.git
cd mi-ui-kit
```

2. Instala dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

4. Abre en el navegador la URL que indique Vite (por defecto `http://localhost:5173`).

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve localmente el build de producción |

---

## Rutas de la aplicación

| Ruta | Descripción |
|------|-------------|
| `/` | Redirige a `/demo` |
| `/demo` | Pantalla de demostración (datos ficticios) |
| `/ui-kit` | Galería de componentes |

---

## Estructura del proyecto

```text
mi-ui-kit/
├── public/
├── src/
│   ├── components/
│   │   ├── layout/       # AppHeader, AppSidebar, ThemeToggle
│   │   └── ui/           # Button, Card, Dialog, Toast, Tabs, etc.
│   ├── composables/
│   ├── layouts/          # AppShell
│   ├── router/
│   ├── views/            # DemoAppView, UiKitView
│   ├── lib/utils.js
│   ├── App.vue
│   ├── main.js
│   └── style.css
├── .env.example
├── package.json
└── README.md
```

---

## Variables de entorno

Opcional. Copia la plantilla:

```bash
cp .env.example .env
```

| Variable | Descripción |
|----------|-------------|
| `VITE_GITHUB_URL` | URL del repositorio; muestra el enlace **GitHub** en el header |

El archivo `.env` no se versiona (ver `.gitignore`).

---

## Componentes incluidos

Entre otros, en `src/components/ui/`:

- **Acciones:** `Button`, `ToggleButtonGroup`
- **Formulario:** `Input`, `TextArea`, `Select`, `Switch`
- **Feedback:** `Tag`, `ProgressBar`, `toast/*`, `AlertDialog`
- **Superficie:** `Card`, `Dialog`, `Popover`, `DropdownMenu`
- **Navegación / datos:** `Tabs`, `Pagination`, `Tooltip`
- **Utilidades:** `Image`, `RangeCalendar`, `LucideIcon`

Composable destacado: **`useAlertDialog`** — confirmaciones desde la lógica de la vista.

---

## Autor

**Nombre:** _[Tu nombre completo]_  

**Contacto:** _[correo profesional]_  

**LinkedIn:** _[https://linkedin.com/in/tu-perfil]_  

**Repositorio:** https://github.com/TU-USUARIO/mi-ui-kit  

**Demo en vivo:** _[URL de Vercel/Netlify si la publicas]_  

---

## Licencia y créditos

- Patrones y estética inspirados en [shadcn/ui](https://ui.shadcn.com) (MIT).
- Iconos: [Lucide](https://lucide.dev/) (ISC).
- Código de este portafolio: uso personal / evaluación técnica; no incluye propiedad intelectual de terceros ni código propietario de empleadores.

Si reutilizas fragmentos, conserva la atribución correspondiente a shadcn/ui y a las librerías listadas en `package.json`.
