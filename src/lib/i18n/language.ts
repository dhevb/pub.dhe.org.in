/** Page language helpers for the separate-journals bilingual model. */

export type PageLanguage = "en" | "hi";

const HINDI_PATH =
  /^\/(vbh|vih)(\/|\.|$)|\/vbh\.rase|\/vih\.rase|\/bal-shodh-patrika/;

export function isHindiPath(pathname: string): boolean {
  return HINDI_PATH.test(pathname);
}

export function getPageLanguage(pathname: string): PageLanguage {
  return isHindiPath(pathname) ? "hi" : "en";
}

/** Inline script sets html lang before React hydrates. */
export const DOCUMENT_LANG_BOOTSTRAP =
  '(function(){try{var p=location.pathname;var hi=/^\\/(vbh|vih)(\\/|\\.|$)/.test(p)||p.indexOf("/vbh.rase")>-1||p.indexOf("/vih.rase")>-1||p.indexOf("/bal-shodh-patrika")>-1;document.documentElement.lang=hi?"hi-IN":"en-IN";}catch(e){}})();';
