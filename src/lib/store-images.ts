export function getStoreImages(store: {
  photo: string;
  storefront: string | null;
  photos?: string[];
}, preferLogo = false) {
  const cover = preferLogo
    ? [store.photo, store.storefront]
    : [store.storefront, store.photo];
  return [...new Set([...cover, ...(store.photos ?? [])].filter((url): url is string => Boolean(url)))];
}
