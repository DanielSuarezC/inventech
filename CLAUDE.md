# InvenTech S.A.S. — Project Instructions

## Project

This project is the official web platform and SaaS prototype
for InvenTech S.A.S.

The project must be developed using:

- Angular 17
- TypeScript
- Tailwind CSS
- Supabase
- Git
- GitHub

---

# SOURCE OF TRUTH

The following documents are authoritative:

1. INVENTECH_Taller_Creacion_Empresa.md
   → Corporate identity and company structure.

2. lineamientos_v2.md
   → Product and service requirements.

3. Brand guidelines
   → Visual identity and design requirements.

Never invent information that can be obtained from these documents.

If there is a conflict between implementation and documentation,
documentation takes precedence.

---

# DEVELOPMENT PRINCIPLES

Always:

- inspect existing code before modifying it;
- reuse existing components when appropriate;
- avoid unnecessary rewrites;
- use strict TypeScript;
- avoid `any`;
- keep components small;
- keep business logic outside templates;
- handle loading states;
- handle errors;
- implement responsive interfaces;
- maintain accessibility;
- maintain visual consistency.

---

# MULTI-AGENT WORKFLOW

Act as a coordinated team composed of:

1. Orchestrator
2. Document Analyst
3. Architect
4. Implementer
5. Designer / Brand Guardian
6. Reviewer
7. Tester / QA
8. Debugger
9. Security Engineer
10. UX Engineer
11. Documentation Agent

The Orchestrator coordinates all other roles.

---

# DEFINITION OF DONE

A task is NOT complete just because it compiles.

A task is complete only when:

- implementation is complete;
- build passes;
- tests pass;
- requirements are satisfied;
- brand guidelines are satisfied;
- responsive behavior is verified;
- security implications are reviewed;
- no regressions are introduced.

---

# DOCUMENTATION

Maintain:

docs/
├── requirements-matrix.md
├── architecture.md
├── design-system.md
├── implementation-plan.md
├── testing.md
├── security.md
├── decisions.md
└── final-compliance-report.md

---

# IMPORTANT REPOSITORY

Use the following repository as a technical reference:

https://github.com/DanielSuarezC/app-lector

Analyze it before implementing the inventory,
POS and barcode scanner applications.

Do not blindly copy it.

Adapt its useful technical concepts to InvenTech.

Do not retain:

- previous company branding;
- previous company names;
- previous company data;
- previous credentials;
- unnecessary backend architecture.

---

# SUPABASE

Supabase is the backend platform.

Use:

- Supabase Auth
- PostgreSQL
- Row Level Security
- Storage when necessary

Never expose private Supabase credentials
in frontend code.

The frontend must never be considered the security boundary.

---

# BRAND

The Designer / Brand Guardian must verify every important UI decision.

The application must feel like ONE coherent InvenTech product.

Do not create visually disconnected applications
for the company site, inventory, POS or scanner.

---

# PRODUCT ECOSYSTEM

The core ecosystem consists of:

1. Inventory Management System
2. Point of Sale System
3. Integrated Barcode Scanner

Inventory and POS can exist independently.

The barcode scanner depends on the software ecosystem.

The scanner must not be presented as an isolated product
without the corresponding software system.

---

# PRESENTATION

The company identity section must also work as
an interactive corporate presentation.

It should support:

- slides;
- previous/next navigation;
- keyboard navigation;
- progress indicator;
- presentation mode;
- responsive layout;
- professional transitions.

---

# QUALITY LOOP

For important features use:

ANALYZE
→ PLAN
→ IMPLEMENT
→ REVIEW
→ TEST
→ DEBUG
→ REVIEW
→ TEST
→ APPROVE

Do not skip validation.

---

# WHEN DOCUMENTS ARE MISSING

If a required source document is missing:

DO NOT INVENT ITS CONTENT.

Report:

BLOCKED — REQUIRED SOURCE DOCUMENT MISSING

Then search the repository for alternative versions
before continuing.

---

# FINAL RULE

Prioritize:

CORRECTNESS
> DOCUMENTATION FIDELITY
> BRAND CONSISTENCY
> SECURITY
> MAINTAINABILITY
> USER EXPERIENCE
> SPEED

Never sacrifice correctness just to finish faster.