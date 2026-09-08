# Design System — INVENTECH S.A.S.

Fuente: `INVENTECH_Taller_Creacion_Empresa.md` §6. Ver [[decisions]] D-004 para
limitaciones (sin logo gráfico original, sustitución tipográfica de Calibri).

## Colores institucionales (tokens)

| Token | Hex | Uso |
|-------|-----|-----|
| `--color-brand-blue` (primary) | `#0A8FE0` | Marca primaria: logo, encabezados, énfasis, CTAs |
| `--color-brand-green` (secondary) | `#3CAE43` | Marca primaria: éxito, acentos, iconos positivos |
| `--color-navy` (support) | `#0B1F33` | Fondos institucionales, texto alto contraste, portadas/slides |
| `--color-gray` (support) | `#5B6472` | Texto secundario, notas, divisores |

Escalas derivadas (para estados hover/disabled/superficies) se generan a partir
de estos 4 colores con tints/shades, nunca introduciendo colores de marca
nuevos no documentados.

## Tipografía

- **Poppins** — logo, `h1`-`h3`, encabezados de sección, slides de presentación.
- **Cuerpo de texto** — Calibri no está disponible en la web de forma libre;
  se usa **Inter** (Google Fonts) como sustituto de legibilidad equivalente
  para párrafos, tablas y contenido operativo (decisión D-004).

## Logo / wordmark

Sin archivo de logo original disponible. Se usa un wordmark tipográfico
"InvenTech" en Poppins semibold con degradado lineal azul (`#0A8FE0`) → verde
(`#3CAE43`), reutilizado de forma consistente en header, favicon-friendly mark
y portada de presentación. Eslogan siempre en minúsculas tipo sentencia:
"Innovamos hoy, transformamos el mañana".

## Componentes reutilizables (`shared/ui`)

- `Button` (variants: primary/secondary/ghost/danger, tamaños sm/md/lg, loading state)
- `Card`
- `Badge` (success/info/warning/danger, mapeados a verde/azul/gris/rojo semántico)
- `Input` / `Select` / `Textarea` (con label, hint, error accesibles)
- `Modal`
- `Table` (con loading/empty states)
- `Alert` / `Toast`
- `EmptyState`
- `LoadingSpinner` / `Skeleton`
- `NavBar` / `Footer`

Reglas: ningún componente de `shared/ui` conoce contenido de negocio de
InvenTech; reciben datos por `@Input()`.

## Espaciado, radios, sombras

Se usa la escala por defecto de Tailwind (4px base) sin modificar, más los
siguientes tokens de marca:

- `--radius-card`: 12px (tarjetas, botones grandes)
- `--radius-control`: 8px (inputs, botones estándar)
- `--shadow-card`: sombra suave para tarjetas sobre fondo claro
- `--shadow-elevated`: sombra para modales/dropdowns

## Estados obligatorios por vista con datos

Toda vista que consuma Supabase implementa 4 estados: loading, error, empty,
success — usando los componentes `LoadingSpinner`/`Skeleton`, `Alert`,
`EmptyState` y el contenido real, respectivamente.

## Accesibilidad

- Contraste mínimo AA verificado sobre azul/verde/navy/gris institucionales
  contra fondos claros y oscuros.
- Toda acción interactiva es un elemento semántico (`button`, `a`) con estado
  de foco visible.
- El Presentation Engine es 100% operable por teclado.
