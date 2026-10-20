import type { Translations } from "./types";

export const frCAMessages: Translations = {
  calendar: {
    month: "Mois",
    year: "Année",
    dayFormat: "Jour (JJ)",
    yearFormat: "Année (AAAA)",
    selectMonth: "—Sélectionnez un mois—",
    selectMonthCompact: "—Mois—",
    months: [
      "janvier",
      "février",
      "mars",
      "avril",
      "mai",
      "juin",
      "juillet",
      "août",
      "septembre",
      "octobre",
      "novembre",
      "décembre",
    ],
    weekdays: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
    monthAriaLabel: (name) => `${name} mois`,
    yearAriaLabel: (name) => `${name} année`,
  },
};
