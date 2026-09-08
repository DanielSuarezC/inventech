# Decisiones Arquitectónicas y de Producto — INVENTECH S.A.S.

Este documento registra decisiones tomadas por el equipo (Orchestrator + agentes)
cuando la información de los documentos base requería interpretación, o cuando
existía conflicto entre documentos.

Regla aplicada siempre: **DOCUMENTO > SUPOSICIÓN**. Cuando dos documentos entran
en conflicto, se documenta el conflicto y se determina cuál tiene mayor autoridad
en lugar de inventar una solución.

---

## D-001 — Nombre real del archivo `lineamientos_v2.md`

**Hallazgo:** El archivo fuente existe como `source-documents/lineamientos v2.md`
(con espacio), no `lineamientos_v2.md` (con guion bajo) como lo nombra `CLAUDE.md`.

**Resolución:** Se trata del mismo documento (diferencia trivial de nombre de
archivo). Se usa su contenido real como fuente. No se bloquea el proyecto por
esto.

**Estado:** Resuelto.

---

## D-002 — Contenido real de `lineamientos v2.md`

**Hallazgo crítico:** El archivo `lineamientos v2.md`, que `CLAUDE.md` describe
como *"Product and service requirements"* de INVENTECH, en realidad contiene un
**informe académico completo de otro proyecto**: el *Proyecto de Aula Semestral
(PAS)* de la Universidad de Santander (UDES), un sistema IoT de inventario y
punto de venta construido para una papelería real llamada **"Impresiones Colina
Real"**, con un equipo de estudiantes distinto al de INVENTECH (Daniel David
Suárez Caldera, Pedro Pablo Lugo Bedoya, Valeria Ospino Bula, Jesús Daniel
Carrascal Hoyos), usando Arduino + Node.js + NestJS + PostgreSQL + Angular 17.

Este contenido coincide en gran medida con la descripción técnica del
repositorio de referencia `app-lector` mencionado en la instrucción maestra
(sección 20), incluyendo su arquitectura de tres capas (Firmware → Bridge Local
→ Backend NestJS), su modelo de datos (Product, ProductVariant, Sale, SaleItem,
ScannerEvent, PaymentMethod, Category) y sus endpoints REST.

**Interpretación adoptada:** `lineamientos v2.md` NO se trata como el documento
de "lineamientos de producto de INVENTECH". Se trata como **material de
referencia técnica del proyecto app-lector**, complementario al repositorio
GitHub `https://github.com/DanielSuarezC/app-lector`, y se usa exclusivamente
para:

- entender la arquitectura técnica de referencia (modelo de datos, flujos de
  POS, inventario y escaneo, endpoints REST);
- adaptar conceptos técnicos (no visuales ni de negocio) al ecosistema
  InvenTech.

**Prohibiciones explícitas aplicadas (instrucción maestra, sección 20):**
- NO se usa la marca "Impresiones Colina Real".
- NO se usan los nombres del equipo de ese proyecto.
- NO se usan datos de esa empresa como si fueran reales de InvenTech.
- NO se arrastra el backend NestJS/Arduino/PostgreSQL-local; Supabase
  reemplaza esa necesidad de backend (Postgres gestionado + Auth + RLS +
  Storage), y el "bridge-local" físico se sustituye por una simulación de
  lectura de códigos de barras vía teclado/input en el navegador.

**Documento de "lineamientos de producto" real de INVENTECH:** ante la ausencia
de un archivo de lineamientos propio de INVENTECH, la fuente de verdad para
producto y servicios de INVENTECH es la sección **10. Portafolio de productos y
servicios** de `INVENTECH_Taller_Creacion_Empresa.md`.

**Estado:** Resuelto — documentado, no bloqueado.

---

## D-003 — Número real de productos comerciales de INVENTECH

**Conflicto:** La instrucción maestra (sección 15 y "PRODUCT ECOSYSTEM") describe
tres productos: (1) Sistema de Gestión de Inventario, (2) Sistema POS, (3) Lector
de código de barras — presentados como si "Inventario" y "POS" fueran productos
comerciales independientes entre sí.

Sin embargo, `INVENTECH_Taller_Creacion_Empresa.md` (documento fuente de mayor
autoridad para catálogo comercial, sección 10) define únicamente **dos
productos comerciales con nombre propio**:

1. **InvenTech POS Cloud** — "Punto de venta e inventario en la nube". Incluye
   explícitamente facturación electrónica, **control de inventario
   multi-bodega en tiempo real**, reportes y alertas de stock. Es decir, el
   documento fuente integra el inventario como una capacidad de POS Cloud, no
   como un producto comercial separado.
2. **InvenTech ScanPro IoT** — lector de códigos de barras IoT, "integrado de
   forma nativa con InvenTech POS Cloud".

**Resolución (documento > instrucción genérica):**
- El **catálogo comercial** (sección "Productos y Servicios" del sitio) muestra
  los **dos productos reales**: InvenTech POS Cloud e InvenTech ScanPro IoT,
  con la relación de dependencia correcta (ScanPro IoT depende del ecosistema
  de software; no se presenta como producto aislado).
- La sección **"Aplicativos"** (demostraciones funcionales) sí implementa
  **tres módulos funcionales** — Inventario, POS y Scanner — porque
  corresponden a capacidades reales descritas en el documento (inventario
  multi-bodega, ventas/facturación, lectura de códigos), y la instrucción
  maestra pide demostraciones separadas por módulo. Esto no inventa un tercer
  producto comercial: los tres módulos aplicativos se presentan como partes del
  mismo ecosistema InvenTech POS Cloud + ScanPro IoT, nunca como "Sistema de
  Inventario" vendido de forma independiente.

**Estado:** Resuelto — se prioriza el documento fuente para el catálogo
comercial; la instrucción maestra se satisface a nivel de aplicativos/demos sin
contradecir el documento.

---

## D-004 — Ausencia de guía de marca separada / logo gráfico

**Hallazgo:** No existe un archivo de guía de marca independiente ni ningún
archivo de imagen (logo, isotipo) en el repositorio. La identidad visual
(colores, tipografía, eslogan) está descrita textualmente en la sección 6 de
`INVENTECH_Taller_Creacion_Empresa.md`, pero las imágenes del logo original
solo existen como texto OCR ilegible dentro del PDF de origen (no se pudo
recuperar el isotipo real).

**Resolución:**
- Se usa la sección 6 del documento como guía de marca oficial (colores exactos,
  tipografías, eslogan).
- Colores: Azul InvenTech `#0A8FE0`, Verde InvenTech `#3CAE43`, Azul navy
  `#0B1F33`, Gris corporativo `#5B6472`.
- Tipografías: **Poppins** (logo, títulos, encabezados) y **Calibri** (texto
  corrido). Para web, Calibri no está disponible vía Google Fonts; se sustituye
  por una fuente sans-serif de legibilidad equivalente (`Inter` o similar
  provista por el sistema/Google Fonts) manteniendo Poppins para
  encabezados. Esta sustitución se declara explícitamente como decisión técnica,
  no como invención de marca.
- El isotipo no se recrea como imagen realista (no hay fuente fiable); se
  construye un wordmark tipográfico ("InvenTech") en Poppins con el degradado
  azul→verde descrito en el documento, usado de forma consistente como
  logo del sitio hasta que la empresa provea el archivo original del logo.

**Estado:** Resuelto con limitación documentada.

---

## D-005 — Supabase: sin credenciales reales

**Hallazgo:** No se proporcionaron credenciales de un proyecto Supabase real.

**Resolución:** Se implementa la integración mediante `environment.ts` /
`environment.development.ts` con placeholders (`SUPABASE_URL`,
`SUPABASE_ANON_KEY`) que el usuario debe reemplazar con las credenciales de su
propio proyecto Supabase. Nunca se hardcodean claves en el código fuente de
componentes/servicios; solo se referencian desde `environment`. El
`anon key` de Supabase es seguro de exponer en frontend por diseño de Supabase
siempre que exista Row Level Security correctamente configurada — esto se
documenta en `docs/security.md`.

**Estado:** Resuelto — requiere acción del usuario (crear proyecto Supabase y
pegar credenciales) antes de que Auth/DB funcionen en runtime real.

---

## D-006 — Nombres ilegibles en la imagen del organigrama

**Hallazgo:** El organigrama de la sección 9.1 de `INVENTECH_Taller_Creacion_Empresa.md`
es una imagen cuyo texto solo llegó como OCR muy degradado (ej.
`"sabel Lopez Camila Torre: serardo Aigel Andrés Pinec Kevin Salcedo..."`).
Los cargos 1 (CEO), 2 (Admin. y Finanzas), 5 (CTO), 8, 9, 10, 11 y 12 sí están
confirmados sin ambigüedad porque también aparecen en tablas de texto plano del
documento (ficha de control del documento, tabla de portafolio de roles 8-12).
Los cargos 3 (Contador Público), 4 (Auxiliar Admin. y Contable), 6 (Dev. Full
Stack Senior) y 7 (Dev. Junior/Hardware IoT) **no** tienen una fuente de texto
confiable — solo el OCR ilegible de la imagen.

**Resolución:** No se asignan nombres inventados o adivinados a esos 4 cargos.
Se marcan explícitamente como `nameUnverified: true` en
`core/data/company.data.ts` y la UI del organigrama muestra un rótulo de
incertidumbre ("Nombre no verificable — OCR ilegible en el documento fuente")
en vez de un nombre. Esto cumple la regla "NO inventar información" incluso
cuando eso significa dejar un dato incompleto.

**Estado:** Resuelto — limitación documentada y visible en la UI.
