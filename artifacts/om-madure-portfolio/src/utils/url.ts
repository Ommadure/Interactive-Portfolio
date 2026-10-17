export const getDomain = (url?: string) => url ? new URL(url).host : '';
