export interface CompanyProfile {
  commercialName: string;
  legalName: string;
  companyType: string;
  nit: string;
  legalRepresentative: string;
  economicSector: string;
  ciiu: string;
  headquarters: string;
  facilities: string;
  targetMarket: string;
  foundationDate: string;
}

export interface IncorporationReason {
  title: string;
  description: string;
}

export interface IncorporationStep {
  order: number;
  title: string;
  description: string;
}

export interface RequiredDocument {
  name: string;
  description: string;
  authority: string;
}

export interface Objective {
  title: string;
  description: string;
}

export interface CoreValue {
  name: string;
  description: string;
}

export type SwotCategory = 'fortalezas' | 'oportunidades' | 'debilidades' | 'amenazas';

export interface SwotItem {
  code: string;
  category: SwotCategory;
  description: string;
}

export interface OrgRole {
  order: number;
  title: string;
  area: 'Dirección' | 'Administración y Finanzas' | 'Tecnología y Desarrollo' | 'Comercial y Servicio';
  responsibility: string;
  assignee: string;
  fictitious?: boolean;
  /** true cuando el nombre proviene de OCR ilegible del organigrama original y no pudo verificarse contra una tabla del documento. */
  nameUnverified?: boolean;
}

export interface ComplementaryInfo {
  location: string;
  facilitiesDetail: string;
  economicActivities: string;
}
