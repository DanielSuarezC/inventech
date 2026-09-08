// Contenido transcrito fielmente de source-documents/INVENTECH_Taller_Creacion_Empresa.md
// No modificar sin actualizar también docs/requirements-matrix.md.
import {
  CompanyProfile,
  IncorporationReason,
  IncorporationStep,
  RequiredDocument,
  Objective,
  CoreValue,
  SwotItem,
  OrgRole,
  ComplementaryInfo,
} from '../models/company.model';

export const COMPANY_SLOGAN = 'Innovamos hoy, transformamos el mañana';

export const COMPANY_PROFILE: CompanyProfile = {
  commercialName: 'INVENTECH S.A.S.',
  legalName: 'INVENTECH S.A.S.',
  companyType: 'Sociedad por Acciones Simplificada (S.A.S.)',
  nit: '901.987.654-3 (ficticio)',
  legalRepresentative: 'Daniel Suárez — Gerente General / CEO',
  economicSector: 'Servicios — Tecnologías de la Información (TI)',
  ciiu:
    '6201 — Actividades de desarrollo de sistemas informáticos (planificación, análisis, diseño, programación, pruebas); 6202 — Actividades de consultoría informática y actividades de administración de instalaciones informáticas.',
  headquarters:
    'Montería, Córdoba, Colombia — zona con acceso a corredor comercial y universitario, cercana a clientes pyme del sector centro.',
  facilities:
    'Oficina tipo coworking de 80 m² distribuida en: recepción, sala de gerencia, área administrativa y contable, laboratorio de desarrollo y hardware/IoT, sala comercial y de capacitación a clientes.',
  targetMarket: 'Pequeñas y medianas empresas (pymes) comerciales y de servicios en la región Caribe colombiana.',
  foundationDate: 'Agosto de 2026 (ficticia)',
};

export const INCORPORATION_REASONS: IncorporationReason[] = [
  {
    title: 'Constitución ágil y económica',
    description:
      'Se constituye mediante documento privado inscrito en la Cámara de Comercio, sin necesidad de escritura pública salvo que se aporten bienes inmuebles, lo que reduce tiempos y costos notariales.',
  },
  {
    title: 'Responsabilidad limitada',
    description:
      'Los accionistas solo responden hasta el monto de sus aportes, protegiendo el patrimonio personal de los cinco socios fundadores.',
  },
  {
    title: 'Estructura organizacional flexible',
    description:
      'La ley permite que los estatutos determinen libremente los órganos de administración y no obliga a adoptar juntas directivas obligatorias ni estructuras rígidas, lo que se ajusta a una empresa tecnológica que inicia pequeña.',
  },
  {
    title: 'Posibilidad de crecimiento y entrada de inversionistas',
    description:
      'La S.A.S. facilita la emisión de nuevas acciones y el ingreso de nuevos socios o inversionistas de capital de riesgo, algo estratégico para una startup de base tecnológica con vocación de escalar.',
  },
  {
    title: 'Unipersonalidad posible y continuidad',
    description:
      'Puede constituirse y sostenerse incluso si en el futuro cambia el número de accionistas, sin disolverse por reducción a un único socio, a diferencia de otras figuras societarias.',
  },
];

export const INCORPORATION_STEPS: IncorporationStep[] = [
  { order: 1, title: 'Verificación de homonimia y disponibilidad del nombre', description: 'Consulta en el Registro Único Empresarial y Social (RUES) de la Cámara de Comercio para confirmar que "INVENTECH S.A.S." no esté ya registrado por otra sociedad.' },
  { order: 2, title: 'Elaboración del documento de constitución', description: 'Redacción del acta o minuta de constitución (documento privado) con los estatutos: objeto social, capital, distribución accionaria, órganos de administración y facultades del representante legal.' },
  { order: 3, title: 'Trámite del Pre-RUT', description: 'Solicitud del Registro Único Tributario provisional ante la DIAN, requisito previo para la inscripción en Cámara de Comercio.' },
  { order: 4, title: 'Inscripción en el Registro Mercantil', description: 'Radicación del documento de constitución y el Pre-RUT en la Cámara de Comercio, pago de derechos de matrícula y obtención del Certificado de Existencia y Representación Legal.' },
  { order: 5, title: 'Obtención del RUT definitivo', description: 'Actualización del RUT ante la DIAN con el NIT definitivo asignado, una vez matriculada la sociedad.' },
  { order: 6, title: 'Apertura de cuenta bancaria empresarial', description: 'Constitución del capital social y canalización de los recursos de la operación a nombre de INVENTECH S.A.S.' },
  { order: 7, title: 'Registro de Industria y Comercio (RIT)', description: 'Inscripción ante la Secretaría de Hacienda municipal de Montería para el pago del impuesto de industria y comercio (ICA).' },
  { order: 8, title: 'Inscripción de los libros contables', description: 'Registro de los libros de contabilidad (Diario, Mayor y Balances, Actas y Accionistas) ante la Cámara de Comercio.' },
  { order: 9, title: 'Solicitud de la resolución de facturación', description: 'Trámite ante la DIAN para habilitar la numeración de facturación electrónica de la empresa.' },
  { order: 10, title: 'Permisos y conceptos adicionales', description: 'Concepto de bomberos, y de ser aplicable, afiliación a Sayco-Acinpro; además, afiliación de los cinco colaboradores al sistema de seguridad social integral (EPS, pensión, ARL) y caja de compensación.' },
  { order: 11, title: 'Registro de marca', description: 'Registro de la marca "INVENTECH" y su isotipo ante la Superintendencia de Industria y Comercio (SIC), para proteger la identidad de la empresa.' },
];

export const REQUIRED_DOCUMENTS: RequiredDocument[] = [
  { name: 'Homonimia', description: 'Certificado de verificación de nombre en el RUES.', authority: 'Cámara de Comercio' },
  { name: 'CIIU', description: 'Clasificación de la(s) actividad(es) económica(s): 6201 y 4741.', authority: 'DIAN / Cámara de Comercio' },
  { name: 'RUT', description: 'Registro Único Tributario (Pre-RUT y RUT definitivo).', authority: 'DIAN' },
  { name: 'RIT', description: 'Registro de Información Tributaria municipal (Industria y Comercio).', authority: 'Secretaría de Hacienda — Montería' },
  { name: 'Acta o minuta de constitución', description: 'Documento privado con los estatutos sociales de INVENTECH S.A.S.', authority: 'Socios fundadores' },
  { name: 'Inscripción Registro Mercantil', description: 'Matrícula mercantil y Certificado de Existencia y Representación Legal.', authority: 'Cámara de Comercio' },
  { name: 'Inscripción libros contables', description: 'Registro de libros oficiales de contabilidad y actas.', authority: 'Cámara de Comercio' },
];

export const MISSION = `INVENTECH S.A.S. es una empresa tecnológica dedicada al desarrollo, la implementación y la comercialización de soluciones innovadoras para la gestión y el control de inventarios, orientadas a empresas que buscan mejorar sus procesos administrativos, comerciales y operativos. Nuestra propuesta integra sistemas de información, puntos de venta, lectores de códigos de barras y plataformas digitales para facilitar un manejo más organizado, eficiente y confiable de los recursos empresariales.

Trabajamos para transformar los procesos tradicionales de gestión de inventarios mediante la automatización y el uso adecuado de la tecnología. Buscamos reducir errores, optimizar tiempos de operación, mantener información actualizada sobre las existencias y proporcionar a nuestros clientes herramientas que les permitan tener mayor control sobre sus productos, ventas y movimientos de inventario.

Nos caracterizamos por ofrecer soluciones accesibles, flexibles y adaptables a las necesidades de cada organización, especialmente de pequeñas y medianas empresas. A través de una atención cercana, acompañamiento durante la implementación, capacitación y soporte técnico, buscamos que nuestros clientes aprovechen la tecnología de manera sencilla y conviertan la información de sus operaciones en una herramienta para mejorar su desempeño.

Nuestro compromiso es generar valor de manera responsable mediante la innovación continua, la calidad de nuestras soluciones, la seguridad de la información y el servicio al cliente, contribuyendo así a la transformación digital de las empresas y construyendo relaciones sostenibles con clientes, colaboradores y demás grupos de interés.`;

export const VISION = `Para 2030, INVENTECH S.A.S. será reconocida como una empresa líder en Colombia en el desarrollo de soluciones tecnológicas para la gestión de inventarios y la automatización de procesos empresariales, destacándose por ofrecer herramientas innovadoras, accesibles y confiables que permitan a las organizaciones mejorar su productividad y tomar decisiones basadas en información precisa.

En los próximos años consolidaremos nuestra presencia en el mercado nacional y ampliaremos progresivamente nuestro alcance hacia nuevos sectores y mercados internacionales, fortaleciendo nuestras soluciones mediante aplicaciones móviles, inteligencia artificial, integración con proveedores, gestión de múltiples establecimientos y herramientas de análisis y predicción de la demanda.

Seremos una empresa en constante evolución, reconocida por la calidad de nuestro servicio, la innovación tecnológica y nuestra capacidad para comprender y solucionar las necesidades reales de nuestros clientes, creciendo de manera sostenible junto con las empresas que confían en INVENTECH y contribuyendo a construir organizaciones más ordenadas, eficientes y competitivas.`;

export const OBJECTIVES: Objective[] = [
  { title: 'Optimizar la gestión de inventarios', description: 'De las empresas clientes mediante soluciones tecnológicas que permitan controlar entradas, salidas y existencias de productos de manera rápida, organizada y en tiempo real.' },
  { title: 'Desarrollar e implementar soluciones tecnológicas accesibles', description: 'Que integren inventario, punto de venta, lectores de códigos de barras y generación de reportes, facilitando la digitalización de pequeñas y medianas empresas.' },
  { title: 'Reducir los errores y pérdidas', description: 'Asociados al manejo manual del inventario, automatizando el registro de productos, la actualización del stock y el control de ventas.' },
  { title: 'Minimizar los márgenes de pérdida', description: 'En el stock físico de las empresas cliente mediante trazabilidad y alertas tempranas.' },
];

export const VALUES: CoreValue[] = [
  { name: 'Innovación', description: 'Buscamos constantemente nuevas tecnologías y formas de mejorar los procesos empresariales.' },
  { name: 'Responsabilidad', description: 'Cumplimos los compromisos adquiridos y garantizamos soluciones confiables para los clientes.' },
  { name: 'Eficiencia', description: 'Diseñamos herramientas que permiten ahorrar tiempo, reducir errores y optimizar los recursos de las empresas.' },
  { name: 'Transparencia', description: 'Proporcionamos información clara y confiable para que los clientes tomen decisiones basadas en datos.' },
  { name: 'Compromiso con el cliente', description: 'Comprendemos las necesidades de cada empresa y ofrecemos soluciones que realmente aportan valor a su operación.' },
  { name: 'Calidad', description: 'Mantenemos altos estándares en el desarrollo, funcionamiento y soporte de nuestras soluciones tecnológicas.' },
];

export const SWOT: SwotItem[] = [
  { code: 'F1', category: 'fortalezas', description: 'Solución tecnológica integral que combina inventario, punto de venta y lector de códigos de barras.' },
  { code: 'F2', category: 'fortalezas', description: 'Actualización del inventario en tiempo real.' },
  { code: 'F3', category: 'fortalezas', description: 'Reducción de errores mediante la automatización del registro de productos y ventas.' },
  { code: 'F4', category: 'fortalezas', description: 'Generación de reportes que facilitan el análisis y la toma de decisiones.' },
  { code: 'F5', category: 'fortalezas', description: 'Solución de bajo costo y adaptable a pequeñas y medianas empresas.' },
  { code: 'F6', category: 'fortalezas', description: 'Posibilidad de ampliar el sistema con facturación, app móvil y multi-sede.' },
  { code: 'O1', category: 'oportunidades', description: 'Creciente necesidad de digitalización de pequeñas y medianas empresas.' },
  { code: 'O2', category: 'oportunidades', description: 'Posibilidad de atender diferentes sectores comerciales, no solo papelerías.' },
  { code: 'O3', category: 'oportunidades', description: 'Integración futura con facturación electrónica y otros servicios empresariales.' },
  { code: 'O4', category: 'oportunidades', description: 'Expansión hacia múltiples sucursales y gestión centralizada de inventarios.' },
  { code: 'O5', category: 'oportunidades', description: 'Desarrollo de aplicaciones móviles para consulta de inventario, ventas y alertas.' },
  { code: 'O6', category: 'oportunidades', description: 'Incorporación de inteligencia artificial para predicción de demanda y reabastecimiento.' },
  { code: 'D1', category: 'debilidades', description: 'Empresa nueva con poco reconocimiento y posicionamiento en el mercado.' },
  { code: 'D2', category: 'debilidades', description: 'Recursos económicos y humanos inicialmente limitados.' },
  { code: 'D3', category: 'debilidades', description: 'Dependencia inicial de infraestructura tecnológica (computador e internet).' },
  { code: 'D4', category: 'debilidades', description: 'Necesidad de soporte y capacitación para clientes poco familiarizados con herramientas digitales.' },
  { code: 'D5', category: 'debilidades', description: 'El mantenimiento del sistema requiere actualización tecnológica constante.' },
  { code: 'D6', category: 'debilidades', description: 'En una primera etapa, capacidad limitada para atender simultáneamente muchos clientes.' },
  { code: 'A1', category: 'amenazas', description: 'Empresas y plataformas de software de inventario y POS ya posicionadas.' },
  { code: 'A2', category: 'amenazas', description: 'Avance rápido de la tecnología, que puede dejar soluciones obsoletas.' },
  { code: 'A3', category: 'amenazas', description: 'Problemas de conectividad a internet que pueden afectar funciones del sistema.' },
  { code: 'A4', category: 'amenazas', description: 'Riesgos de seguridad de la información y protección de datos de los clientes.' },
  { code: 'A5', category: 'amenazas', description: 'Resistencia de algunos empresarios a abandonar métodos tradicionales de manejo de inventario.' },
  { code: 'A6', category: 'amenazas', description: 'Cambios normativos relacionados con facturación y operación comercial.' },
];

// Nota (ver docs/decisions.md D-006): los nombres de los cargos 3, 4, 6 y 7
// provienen de una imagen del organigrama cuyo OCR resultó ilegible/ambiguo
// en el documento fuente. No se asignan nombres inventados para esos cargos;
// se marcan como `nameUnverified` y se muestra un rótulo de incertidumbre en
// la UI en lugar de afirmar una identidad no confirmable. Los cargos 1, 2, 5,
// 8, 9, 10, 11 y 12 sí están confirmados por tablas de texto explícitas del
// documento (ficha de control del documento y tabla de portafolio/roles).
export const ORG_ROLES: OrgRole[] = [
  { order: 1, title: 'Gerente General / CEO', area: 'Dirección', responsibility: 'Dirección estratégica y representación legal de la compañía.', assignee: 'Daniel Suárez' },
  { order: 2, title: 'Administración y Finanzas', area: 'Administración y Finanzas', responsibility: 'Gestión administrativa, financiera y contable de la empresa.', assignee: 'Isabel López' },
  { order: 3, title: 'Contador Público', area: 'Administración y Finanzas', responsibility: 'Contabilidad y cumplimiento tributario.', assignee: 'Nombre no verificable (OCR ilegible en el organigrama fuente)', fictitious: true, nameUnverified: true },
  { order: 4, title: 'Auxiliar Administrativo y Contable', area: 'Administración y Finanzas', responsibility: 'Soporte administrativo y contable.', assignee: 'Nombre no verificable (OCR ilegible en el organigrama fuente)', fictitious: true, nameUnverified: true },
  { order: 5, title: 'CTO', area: 'Tecnología y Desarrollo', responsibility: 'Liderazgo técnico del desarrollo de software y hardware.', assignee: 'Gerardo Argel' },
  { order: 6, title: 'Dev. Full Stack Senior', area: 'Tecnología y Desarrollo', responsibility: 'Desarrollo de las plataformas de software.', assignee: 'Nombre no verificable (OCR ilegible en el organigrama fuente)', fictitious: true, nameUnverified: true },
  { order: 7, title: 'Dev. Junior / Hardware IoT', area: 'Tecnología y Desarrollo', responsibility: 'Desarrollo e integración de hardware IoT.', assignee: 'Nombre no verificable (OCR ilegible en el organigrama fuente)', fictitious: true, nameUnverified: true },
  { order: 8, title: 'Analista QA / Tester', area: 'Tecnología y Desarrollo', responsibility: 'Realizar pruebas para garantizar la calidad y el funcionamiento del sistema.', assignee: 'Julián Restrepo', fictitious: true },
  { order: 9, title: 'Ejecutiva Comercial', area: 'Comercial y Servicio', responsibility: 'Buscar clientes, presentar la solución y cerrar negocios.', assignee: 'Luz Mazo' },
  { order: 10, title: 'Analista de Implementación y Capacitación', area: 'Comercial y Servicio', responsibility: 'Instalar el sistema, configurar clientes y capacitarlos.', assignee: 'Diego Herrera', fictitious: true },
  { order: 11, title: 'Soporte Técnico', area: 'Comercial y Servicio', responsibility: 'Atender incidentes, dudas y requerimientos de los clientes.', assignee: 'Valentina Ríos', fictitious: true },
  { order: 12, title: 'Analista de Marketing y Comunicaciones', area: 'Comercial y Servicio', responsibility: 'Gestionar redes sociales, publicidad, contenidos y posicionamiento de la marca.', assignee: 'Yennifer Canaval' },
];

export const COMPLEMENTARY_INFO: ComplementaryInfo = {
  location:
    'INVENTECH S.A.S. estará ubicada en la ciudad de Montería, Córdoba, en una zona de fácil acceso cercana al centro comercial y financiero de la ciudad, lo que facilita la visita de clientes pyme, la logística de entrega de dispositivos IoT y la cercanía con el talento técnico egresado de las universidades e instituciones de formación de la región.',
  facilitiesDetail:
    'La empresa operará en una oficina de aproximadamente 80 m², distribuida en cinco espacios: (1) recepción y sala de espera para clientes, (2) oficina de gerencia, (3) área administrativa y contable, (4) laboratorio de desarrollo de software y pruebas de hardware/IoT, y (5) sala comercial y de capacitación, usada tanto para reuniones con clientes como para entrenar a los usuarios finales en el uso de la plataforma.',
  economicActivities:
    'La actividad económica principal de INVENTECH corresponde al código CIIU 6201 — Actividades de desarrollo de sistemas informáticos (planificación, análisis, diseño, programación y pruebas), complementada con el código CIIU 4741 — Comercio al por menor de equipos de informática, dado que la empresa también comercializa el dispositivo InvenTech ScanPro IoT.',
};
