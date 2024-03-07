import { useNuxtApp, useRequestURL, useState } from '#imports'

export const useDomain = () => {
  const {hostname:currentDomain} = useRequestURL();
  const domain = useState<string>('domain', () => currentDomain);
  return currentDomain;
}
