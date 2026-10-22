import type { Translations } from "./types";

export const frCAMessages: Translations = {
  dateTime: {
    locale: "fr-CA",
    today: "Aujourd’hui",
    yesterday: "Hier",
    now: "À l’instant",
    minutesAgo: (count) => `Il y a ${count} min`,
    hoursAgo: (count) => `Il y a ${count} h`,
    daysAgo: (count) => `Il y a ${count} j`,
  },
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
  dropdown: {
    select: "—Sélectionner—",
    noMatchesFound: "Aucune correspondance trouvée",
    clearInput: "Effacer la saisie",
  },
  dropdownMultiselect: {
    select: "—Sélectionner—",
    filter: "Filtrer...",
    filterOptions: "Filtrer les options",
    clearFilter: "Effacer le filtre",
    options: "Options",
    selectAll: "Tout sélectionner",
    selectedItems: (count) => `${count} éléments`,
  },
  pagination: {
    page: "Page",
    of: "sur",
    previous: "Précédent",
    next: "Suivant",
  },
  appHeader: {
    governmentOfAlbertaLogo: "Logo du gouvernement de l’Alberta",
    serviceName: "[Nom du service]",
    utilitiesMenu: "Menu des utilitaires",
    menu: "Menu",
  },
  appHeaderNavigation: {
    more: "Plus",
  },
  micrositeHeader: {
    alpha: "Alpha",
    beta: "Bêta",
    officialSiteBeforeGovernment: "Un site officiel du",
    officialSiteAfterGovernment: "",
    newServiceBeforeGovernment: "Il s’agit d’un nouveau service du",
    newServiceAfterGovernment: "",
    governmentOfAlberta: "gouvernement de l’Alberta",
    feedbackPrompt: "— aidez-nous à l’améliorer en nous faisant part de vos",
    feedback: "commentaires",
  },
  fileUploadInput: {
    invalidFileType: "Type de fichier non valide",
    fileTooLarge: (maximumSize) =>
      `La taille du fichier doit être inférieure à ${maximumSize}`,
    dragAndDrop: "Glissez-déposez des fichiers ici",
    or: "ou",
    browseFiles: "Parcourir les fichiers",
    maximumFileSize: (maximumSize) =>
      `La taille maximale du fichier est de ${maximumSize}`,
    chooseFile: "Choisir un fichier",
  },
  fileUploadCard: {
    uploadedOn: (date) =>
      `Téléversé le ${date.toLocaleString("fr-CA", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })}`,
    cancel: "Annuler",
    remove: "Supprimer",
    unavailable: "s. o.",
  },
  filterChip: {
    removeFilter: (content) =>
      content ? `Supprimer le filtre : ${content}` : "Supprimer le filtre",
  },
  menuButton: {
    openMenu: "Ouvrir le menu",
  },
  modal: {
    modal: "Fenêtre modale",
    closeModal: "Fermer la fenêtre modale",
  },
  drawer: {
    closeDrawer: "Fermer le tiroir",
  },
  pushDrawer: {
    closeDrawer: "Fermer le tiroir",
  },
  scrollPanel: {
    header: "En-tête du panneau",
    content: "Contenu défilant",
    footer: "Pied de page du panneau",
  },
  workspaceLayout: {
    openMenu: "Ouvrir le menu",
    sideNavigation: "Navigation latérale",
    pageContent: "Contenu de la page",
    pushDrawer: "Tiroir escamotable",
  },
  workSideMenu: {
    hideMenu: "Masquer le menu",
    governmentOfAlbertaLogo: "Logo du gouvernement de l’Alberta",
    collapseMenu: "Réduire le menu",
    expandMenu: "Développer le menu",
  },
  workSideMenuGroup: {
    closeGroup: "Fermer le groupe",
    openGroup: "Ouvrir le groupe",
  },
  workSideNotificationPanel: {
    notifications: "Notifications",
    closeNotifications: "Fermer les notifications",
    unread: "Non lues",
    urgent: "Urgentes",
    all: "Toutes",
    caughtUp: "Vous êtes à jour",
    noUnreadNotifications: "Aucune notification non lue",
    noUrgentNotifications: "Aucune notification urgente",
    noNotifications: "Aucune notification",
    viewAll: "Tout afficher",
    markAllAsRead: "Tout marquer comme lu",
  },
  workSideNotificationItem: {
    information: "Information",
    warning: "Avertissement",
    success: "Succès",
    critical: "Critique",
  },
};
