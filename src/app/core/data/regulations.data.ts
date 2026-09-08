// Documentos normativos de ejemplo. En producción, `documents` se administra
// desde Supabase (tabla `documents`, ver supabase/schema.sql) y aquí solo se
// muestra un fallback estático mientras no haya conexión o datos.
import { RegulationDocument } from '../models/regulation-document.model';

export const SAMPLE_REGULATION_DOCUMENTS: RegulationDocument[] = [];
