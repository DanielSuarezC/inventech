// Catálogo comercial oficial de INVENTECH S.A.S., transcrito de
// source-documents/INVENTECH_Taller_Creacion_Empresa.md §10.
// Solo existen DOS productos comerciales con nombre propio (ver docs/decisions.md D-003).
import { CatalogProduct } from '../models/product.model';

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 'pos-cloud',
    name: 'InvenTech POS Cloud',
    tagline: 'Punto de venta e inventario en la nube',
    description:
      'Software de facturación y control de inventario en tiempo real, pensado para pequeñas y medianas empresas comerciales. Centraliza ventas, existencias y reportes desde cualquier dispositivo con conexión a internet.',
    priceValueCOP: 149000,
    referencePrice: '$149.000 COP',
    priceUnit: '/ mes, por sede',
    features: [
      'Facturación electrónica integrada con la DIAN.',
      'Control de inventario multi-bodega en tiempo real.',
      'Reportes de ventas, rotación de producto y utilidad.',
      'Alertas automáticas de stock mínimo y vencimientos.',
    ],
    standalone: true,
    installationIncluded: true,
    image: 'assets/inventechpos.jpg',
  },
  {
    id: 'scanpro-iot',
    name: 'InvenTech ScanPro IoT',
    tagline: 'Lector inteligente conectado',
    description:
      'Dispositivo lector de códigos de barras con conectividad IoT, integrado de forma nativa con InvenTech POS Cloud. Permite tomas de inventario físico ágiles y sincronización automática con la plataforma en la nube.',
    priceValueCOP: 89000,
    referencePrice: '$89.000 COP',
    priceUnit: '/ mes, por sede',
    features: [
      'Lectura láser de alta velocidad y batería de larga duración.',
      'Sincronización automática por Wi-Fi con InvenTech POS Cloud.',
      'Toma de inventario físico sin digitación manual.',
      'Compatible con múltiples sedes y bodegas.',
    ],
    dependsOn: 'pos-cloud',
    standalone: false,
    installationIncluded: true,
    image: 'assets/inventechscan.jpg',
  },
];

const COP_FORMATTER = new Intl.NumberFormat('es-CO', { maximumFractionDigits: 0 });

/**
 * Plan Completo = InvenTech POS Cloud + InvenTech ScanPro IoT.
 * El precio se calcula dinámicamente a partir de `priceValueCOP` de ambos
 * productos (nunca se escribe un valor manual distinto) — ver instrucción
 * maestra §15.
 */
export const FULL_PLAN_PRICE_COP = CATALOG_PRODUCTS.reduce((sum, p) => sum + p.priceValueCOP, 0);
export const FULL_PLAN_PRICE_LABEL = `$${COP_FORMATTER.format(FULL_PLAN_PRICE_COP)} COP`;
