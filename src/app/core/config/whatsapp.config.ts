// Configuración centralizada de WhatsApp — no duplicar el número en otros archivos.
// Número provisto directamente por el usuario (orquestación 2026-09-08).
export const WHATSAPP_NUMBER = '573144714547';
export const WHATSAPP_MESSAGE =
  'Hola InvenTech, quiero más información sobre sus soluciones de inventario, POS y lectura de códigos de barras.';

export function buildWhatsappLink(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
