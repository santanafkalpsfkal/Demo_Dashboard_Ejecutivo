/**
 * Compatibilidad: el asistente real vive en ui/components/virtualito.
 */
export { useVirtualitoStore } from '../../ui/components/virtualito/virtualitoStore';
import { useVirtualitoStore as store } from '../../ui/components/virtualito/virtualitoStore';

export function advise(actionKey, customText) {
  store.getState().advise(actionKey, customText);
}
