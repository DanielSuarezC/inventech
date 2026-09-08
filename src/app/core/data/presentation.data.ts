import { PresentationSlide } from '../models/presentation.model';
import {
  COMPANY_PROFILE,
  COMPANY_SLOGAN,
  INCORPORATION_REASONS,
  INCORPORATION_STEPS,
  REQUIRED_DOCUMENTS,
  MISSION,
  VISION,
  OBJECTIVES,
  VALUES,
  SWOT,
  ORG_ROLES,
  COMPLEMENTARY_INFO,
} from './company.data';
import { CATALOG_PRODUCTS } from './catalog.data';

function paragraphs(text: string): string[] {
  return text.split('\n\n');
}

export const COMPANY_PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    id: 'portada',
    index: 0,
    title: 'INVENTECH S.A.S.',
    subtitle: COMPANY_SLOGAN,
    blocks: [
      {
        type: 'gallery',
        content: [
          {
            title: 'InvenTech POS Cloud',
            subtitle: 'Punto de venta e inventario en la nube',
            image: 'assets/inventechpos.jpg',
          },
          {
            title: 'InvenTech ScanPro IoT',
            subtitle: 'Lector inteligente conectado',
            image: 'assets/inventechscan.jpg',
          },
        ],
      },
      {
        type: 'text',
        content: [
          'Taller de Creación de Empresa — SENA. Presentación ejecutiva interactiva de la identidad y conformación de INVENTECH S.A.S., soluciones tecnológicas integrales para la gestión de inventarios y puntos de venta en pequeñas y medianas empresas.',
        ],
      },
    ],
  },
  {
    id: 'ficha-general',
    index: 1,
    title: 'Ficha general de la empresa',
    blocks: [
      {
        type: 'table',
        content: {
          headers: ['Campo', 'Detalle'],
          rows: [
            ['Nombre comercial', COMPANY_PROFILE.commercialName],
            ['Razón social', COMPANY_PROFILE.legalName],
            ['Tipo societario', COMPANY_PROFILE.companyType],
            ['NIT (ficticio)', COMPANY_PROFILE.nit],
            ['Representante legal', COMPANY_PROFILE.legalRepresentative],
            ['Sector económico', COMPANY_PROFILE.economicSector],
            ['Actividad económica (CIIU)', COMPANY_PROFILE.ciiu],
            ['Domicilio principal', COMPANY_PROFILE.headquarters],
            ['Mercado objetivo', COMPANY_PROFILE.targetMarket],
            ['Fecha de constitución (ficticia)', COMPANY_PROFILE.foundationDate],
          ],
        },
      },
    ],
  },
  {
    id: 'tipo-societario',
    index: 2,
    title: 'Tipo de sociedad seleccionada',
    subtitle: 'Sociedad por Acciones Simplificada (S.A.S.)',
    blocks: [
      {
        type: 'cards',
        content: INCORPORATION_REASONS,
      },
    ],
  },
  {
    id: 'proceso-constitucion',
    index: 3,
    title: 'Proceso de constitución legal',
    blocks: [{ type: 'list', content: INCORPORATION_STEPS }],
  },
  {
    id: 'documentos-requeridos',
    index: 4,
    title: 'Documentos requeridos para la constitución',
    blocks: [
      {
        type: 'table',
        content: {
          headers: ['Documento', 'Descripción', 'Entidad responsable'],
          rows: REQUIRED_DOCUMENTS.map((d) => [d.name, d.description, d.authority]),
        },
      },
    ],
  },
  {
    id: 'identidad-corporativa',
    index: 5,
    title: 'Identidad corporativa',
    subtitle: 'Logo, eslogan, colores y tipografía',
    blocks: [
      {
        type: 'text',
        content: [
          `Eslogan: "${COMPANY_SLOGAN}".`,
          'Colores institucionales: Azul InvenTech (#0A8FE0) y Verde InvenTech (#3CAE43), tomados del degradado del isotipo — confianza, seguridad, tecnología, crecimiento y equilibrio. Azul navy (#0B1F33) para fondos institucionales y textos de alto contraste. Gris corporativo (#5B6472) para textos secundarios.',
          'Tipografía corporativa: Poppins (logo, títulos y encabezados) y Calibri (texto corrido, tablas y contenido operativo).',
        ],
      },
    ],
  },
  {
    id: 'mision-vision',
    index: 6,
    title: 'Misión y Visión corporativa',
    blocks: [
      {
        type: 'accordion',
        content: [
          {
            title: '🎯 Misión',
            content: paragraphs(MISSION),
          },
          {
            title: '🔮 Visión 2030',
            content: paragraphs(VISION),
          },
        ],
      },
    ],
  },
  {
    id: 'objetivos',
    index: 7,
    title: 'Objetivos corporativos',
    blocks: [{ type: 'list', content: OBJECTIVES }],
  },
  {
    id: 'valores',
    index: 8,
    title: 'Valores corporativos',
    blocks: [
      {
        type: 'cards',
        content: VALUES.map((v) => ({ title: v.name, description: v.description })),
      },
    ],
  },
  {
    id: 'dofa',
    index: 9,
    title: 'Matriz DOFA',
    blocks: [
      {
        type: 'swot',
        content: [
          { label: 'Fortalezas', items: SWOT.filter((s) => s.category === 'fortalezas') },
          { label: 'Oportunidades', items: SWOT.filter((s) => s.category === 'oportunidades') },
          { label: 'Debilidades', items: SWOT.filter((s) => s.category === 'debilidades') },
          { label: 'Amenazas', items: SWOT.filter((s) => s.category === 'amenazas') },
        ],
      },
    ],
  },
  {
    id: 'organigrama',
    index: 10,
    title: 'Estructura organizacional',
    subtitle: 'Asamblea de Accionistas → Gerencia General → 3 áreas',
    blocks: [
      {
        type: 'orgchart',
        content: [
          { area: 'Dirección', roles: ORG_ROLES.filter((r) => r.area === 'Dirección') },
          { area: 'Administración y Finanzas', roles: ORG_ROLES.filter((r) => r.area === 'Administración y Finanzas') },
          { area: 'Tecnología y Desarrollo', roles: ORG_ROLES.filter((r) => r.area === 'Tecnología y Desarrollo') },
          { area: 'Comercial y Servicio', roles: ORG_ROLES.filter((r) => r.area === 'Comercial y Servicio') },
        ],
      },
    ],
  },
  {
    id: 'portafolio',
    index: 11,
    title: 'Portafolio de productos y servicios',
    blocks: [
      {
        type: 'gallery',
        content: CATALOG_PRODUCTS.map((p) => ({
          title: p.name,
          subtitle: `${p.referencePrice}${p.priceUnit} — ${p.description}`,
          image: p.image || 'assets/isotipo.png',
        })),
      },
    ],
  },
  {
    id: 'info-complementaria',
    index: 12,
    title: 'Información complementaria',
    blocks: [
      {
        type: 'text',
        content: [
          COMPLEMENTARY_INFO.location,
          COMPLEMENTARY_INFO.facilitiesDetail,
          COMPLEMENTARY_INFO.economicActivities,
        ],
      },
    ],
  },
];
