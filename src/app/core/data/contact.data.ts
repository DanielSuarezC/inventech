// Información oficial de contacto de INVENTECH S.A.S.
// No inventar URLs no confirmadas: donde no hay enlace directo confirmado,
// se guarda `href: null` y la UI muestra el usuario/handle sin enlace roto.
export interface SocialChannel {
  id: string;
  name: string;
  handle: string;
  href: string | null;
  icon: 'instagram' | 'linkedin' | 'facebook' | 'tik-tok' | 'youtube';
}

export const CONTACT_EMAIL = 'inventech.sas@gmail.com';
export const CONTACT_WEBSITE = 'www.inventech.pages.dev';

export const SOCIAL_CHANNELS: SocialChannel[] = [
  { id: 'instagram', name: 'Instagram', handle: '@inventech_sas', href: 'https://instagram.com/inventech_sas', icon: 'instagram' },
  { id: 'linkedin', name: 'LinkedIn', handle: 'INVENTECH S.A.S', href: 'https://linkedin.com/company/inventech-sas', icon: 'linkedin' },
  { id: 'facebook', name: 'Facebook', handle: '@inventech.oficial', href: 'https://facebook.com/inventech.oficial', icon: 'facebook' },
  { id: 'tiktok', name: 'TikTok', handle: '@inventech_app', href: 'https://tiktok.com/@inventech_app', icon: 'tik-tok' },
  { id: 'youtube', name: 'YouTube', handle: '@INVENTECHSAS', href: 'https://youtube.com/@INVENTECHSAS', icon: 'youtube' },
];
