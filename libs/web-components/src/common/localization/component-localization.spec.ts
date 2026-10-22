import { cleanup, fireEvent, render, waitFor } from "@testing-library/svelte";
import { afterEach, describe, expect, it } from "vitest";
import AppHeader from "../../components/app-header/AppHeader.svelte";
import MicrositeHeader from "../../components/microsite-header/MicrositeHeader.svelte";
import FileUploadInput from "../../components/file-upload-input/FileUploadInput.svelte";
import FileUploadCard from "../../components/file-upload-card/FileUploadCard.svelte";
import FilterChip from "../../components/filter-chip/FilterChip.svelte";
import MenuButton from "../../components/menu-button/MenuButton.svelte";
import Modal from "../../components/modal/Modal.svelte";
import Drawer from "../../components/drawer/Drawer.svelte";
import PushDrawerInternal from "../../components/push-drawer/PushDrawerInternal.svelte";
import ScrollPanel from "../../components/scroll-panel/ScrollPanel.svelte";
import WorkspaceLayout from "../../components/workspace-layout/WorkspaceLayout.svelte";
import WorkSideMenu from "../../components/work-side-menu/WorkSideMenu.svelte";
import WorkSideMenuGroup from "../../components/work-side-menu/WorkSideMenuGroup.svelte";
import WorkSideNotificationPanel from "../../components/work-side-menu/WorkSideNotificationPanel.svelte";
import WorkSideNotificationItem from "../../components/work-side-menu/WorkSideNotificationItem.svelte";
import { getTranslations } from ".";

afterEach(() => {
  cleanup();
  document.documentElement.removeAttribute("lang");
});

describe("French component translations", () => {
  it("localizes headers and file uploads", async () => {
    document.documentElement.lang = "fr-CA";

    const appHeader = render(AppHeader);
    await waitFor(() => {
      expect(
        appHeader.container.querySelector(".service-name"),
      ).toHaveTextContent("[Nom du service]");
    });
    expect(appHeader.container.querySelector('[role="img"]')).toHaveAttribute(
      "aria-label",
      "Logo du gouvernement de l’Alberta",
    );
    expect(getTranslations().appHeaderNavigation.more).toBe("Plus");

    const micrositeHeader = render(MicrositeHeader, {
      type: "beta",
      feedbackurl: "https://example.com",
    });
    await waitFor(() => {
      expect(micrositeHeader.getByTestId("type")).toHaveTextContent("Bêta");
    });
    expect(micrositeHeader.getByTestId("site-text")).toHaveTextContent(
      "Il s’agit d’un nouveau service du gouvernement de l’Alberta",
    );
    expect(micrositeHeader.getByTestId("feedback")).toHaveTextContent(
      "commentaires",
    );

    const uploadInput = render(FileUploadInput, {
      testid: "upload",
      accept: ".pdf",
    });
    await waitFor(() => {
      expect(uploadInput.getByTestId("upload")).toHaveTextContent(
        "Glissez-déposez des fichiers ici",
      );
    });
    expect(uploadInput.getByTestId("max-file-size")).toHaveTextContent(
      "La taille maximale du fichier est de 5MB",
    );

    const invalidFile = new File(["content"], "file.txt", {
      type: "text/plain",
    });
    await fireEvent.change(uploadInput.getByTestId("input"), {
      target: { files: [invalidFile] },
    });
    await waitFor(() => {
      const issue = uploadInput.getByTestId("upload-issue-0") as HTMLElement & {
        error: string;
      };
      expect(issue.error || issue.getAttribute("error")).toBe(
        "Type de fichier non valide",
      );
    });

    const uploadCard = render(FileUploadCard, {
      filename: "document.pdf",
      size: 1024,
      progress: 100,
    });
    await waitFor(() => {
      expect(uploadCard.getByTestId("timestamp")).toHaveTextContent(
        "Téléversé le",
      );
    });
    expect(
      uploadCard.getByTestId("actions").querySelector("goa-button"),
    ).toHaveTextContent("Supprimer");
  });

  it("localizes standalone accessibility labels", async () => {
    document.documentElement.lang = "fr-CA";

    const filterChip = render(FilterChip, { content: "Statut" });
    await waitFor(() => {
      expect(
        filterChip.container.querySelector("goa-icon-button"),
      ).toHaveAttribute("arialabel", "Supprimer le filtre : Statut");
    });

    const menuButton = render(MenuButton, {
      leadingIcon: "ellipsis-horizontal",
    });
    await waitFor(() => {
      expect(
        menuButton.container.querySelector("goa-icon-button"),
      ).toHaveAttribute("arialabel", "Ouvrir le menu");
    });

    const modal = render(Modal, { open: "true", closable: "true" });
    await waitFor(() => {
      expect(modal.getByTestId("modal-title")).toHaveAttribute(
        "aria-label",
        "Fenêtre modale",
      );
    });
    expect(modal.getByTestId("modal-close-button")).toHaveAttribute(
      "arialabel",
      "Fermer la fenêtre modale",
    );

    const drawer = render(Drawer, { open: true, position: "right" });
    await waitFor(() => {
      expect(drawer.getByTestId("drawer-close-button")).toHaveAttribute(
        "arialabel",
        "Fermer le tiroir",
      );
    });

    const pushDrawer = render(PushDrawerInternal, { open: true });
    await waitFor(() => {
      expect(
        pushDrawer.container.querySelector(
          '[data-testid="drawer-close-button"]',
        ),
      ).toHaveAttribute("arialabel", "Fermer le tiroir");
    });

    const scrollPanel = render(ScrollPanel, { testid: "scroll-panel" });
    await waitFor(() => {
      expect(scrollPanel.getByTestId("scroll-panel")).toHaveAttribute(
        "aria-label",
        "Contenu défilant",
      );
    });

    const workspace = render(WorkspaceLayout, { testid: "workspace" });
    await waitFor(() => {
      expect(workspace.container.querySelector(".card")).toHaveAttribute(
        "aria-label",
        "Contenu de la page",
      );
    });
  });

  it("localizes the work side menu", async () => {
    document.documentElement.lang = "fr-CA";

    const sideMenu = render(WorkSideMenu, {
      heading: "Service",
      url: "https://example.com",
      open: true,
    });
    await waitFor(() => {
      expect(sideMenu.getByTestId("toggle-menu")).toHaveAttribute(
        "aria-label",
        "Réduire le menu",
      );
    });
    expect(sideMenu.container.querySelector(".background")).toHaveAttribute(
      "aria-label",
      "Masquer le menu",
    );

    const sideMenuGroup = render(WorkSideMenuGroup, {
      heading: "Demandes",
    });
    await waitFor(() => {
      expect(sideMenuGroup.container.querySelector("details")).toHaveAttribute(
        "aria-label",
        "Ouvrir le groupe",
      );
    });
  });

  it("localizes notifications and their dates", async () => {
    document.documentElement.lang = "fr-CA";

    const panel = render(WorkSideNotificationPanel, { testid: "panel" });
    await waitFor(() => {
      expect(panel.container.querySelector("goa-text")).toHaveTextContent(
        "Notifications",
      );
    });
    const tabs = panel.container.querySelectorAll('[slot="heading"]');
    expect(tabs[0]).toHaveTextContent("Non lues");
    expect(tabs[1]).toHaveTextContent("Urgentes");
    expect(tabs[2]).toHaveTextContent("Toutes");
    expect(panel.container.querySelector(".subline")).toHaveTextContent(
      "Aucune notification non lue",
    );
    expect(panel.container.querySelector("goa-icon-button")).toHaveAttribute(
      "arialabel",
      "Fermer les notifications",
    );

    const item = render(WorkSideNotificationItem, {
      type: "warning",
      description: "Description",
      timestamp: new Date().toISOString(),
      testid: "item",
    });
    await waitFor(() => {
      expect(item.getByTestId("timestamp-item")).toHaveTextContent(
        "À l’instant",
      );
    });
    expect(
      item.getByTestId("badge-item").querySelector("goa-badge"),
    ).toHaveAttribute("arialabel", "Avertissement");
  });
});
