import { enCAMessages } from "./en-CA";
import { frCAMessages } from "./fr-CA";
import type { Locale } from "date-fns";
import { enCA, frCA } from "date-fns/locale";
import {
  SUPPORTED_LANGUAGES,
  type SupportedLanguage,
  type Translations,
} from "./types";

export const DEFAULT_LANGUAGE: SupportedLanguage = "en-CA";

type LocalizedTranslations = Translations & { dateFnsLocale: Locale };

const translations: Record<SupportedLanguage, LocalizedTranslations> = {
  "en-CA": { ...enCAMessages, dateFnsLocale: enCA },
  "fr-CA": { ...frCAMessages, dateFnsLocale: frCA },
};

export function normalizeLanguage(language?: string | null): SupportedLanguage {
  const normalizedLanguage = language?.trim().toLowerCase();
  return (
    SUPPORTED_LANGUAGES.find(
      (supportedLanguage) =>
        supportedLanguage.toLowerCase() === normalizedLanguage,
    ) || DEFAULT_LANGUAGE
  );
}

function findClosestLanguage(element?: Element | null): string | null {
  let currentElement = element || null;

  // Break out of the Shadow Root first
  while (currentElement) {
    const root = currentElement.getRootNode();
    if (!(root instanceof ShadowRoot)) break;
    currentElement = root.host;
  }

  while (currentElement) {
    const language = currentElement.getAttribute("lang")?.trim();
    if (language) return language;
    currentElement = currentElement.parentElement;
  }

  return null;
}

export function resolveLanguage(element?: Element | null): SupportedLanguage {
  const closestLanguage = findClosestLanguage(element);
  if (closestLanguage) return normalizeLanguage(closestLanguage);

  const ownerDocument =
    element?.ownerDocument ||
    (typeof document === "undefined" ? undefined : document);
  return normalizeLanguage(ownerDocument?.documentElement.getAttribute("lang"));
}

export function getTranslations(
  element?: Element | null,
): LocalizedTranslations {
  return translations[resolveLanguage(element)];
}
