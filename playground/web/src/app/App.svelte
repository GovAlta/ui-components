<script lang="ts">
  import "@abgov/style";
  import { onMount } from "svelte";

  import AccordianPage from "../pages/AccordianPage.svelte"
  import BadgePage from "../pages/BadgePage.svelte"
  import BlockPage from "../pages/BlockPage.svelte"
  import ButtonGroupPage from "../pages/ButtonGroupPage.svelte"
  import ButtonPage from "../pages/ButtonPage.svelte"
  import CalloutPage from "../pages/CalloutPage.svelte"
  import CheckboxPage from "../pages/CheckboxPage.svelte"
  import ChipPage from "../pages/ChipPage.svelte"
  import ContainerPage from "../pages/ContainerPage.svelte"
  import DatePickerPage from "../pages/DatePickerPage.svelte"
  import DetailsPage from "../pages/DetailsPage.svelte"
  import DividerPage from "../pages/DividerPage.svelte"
  import DropdownPage from "../pages/DropdownPage.svelte"
  import FileUploaderPage from "../pages/FileUploaderPage.svelte"
  import FooterPage from "../pages/FooterPage.svelte"
  import FormItemPage from "../pages/FormItemPage.svelte"
  import FormStepperPage from "../pages/FormStepperPage.svelte"
  import GridPage from "../pages/GridPage.svelte"
  import HeaderPage from "../pages/HeaderPage.svelte"
  import HeroBannerPage from "../pages/HeroBannerPage.svelte"
  import IconButtonPage from "../pages/IconButtonPage.svelte"
  import IconPage from "../pages/IconPage.svelte"
  import ListPage from "../pages/ListPage.svelte"
  import MicrositeHeaderPage from "../pages/MicrositeHeaderPage.svelte"
  import ModalPage from "../pages/ModalPage.svelte"
  import NotificationBannerPage from "../pages/NotificationBannerPage.svelte"
  import PaginationPage from "../pages/PaginationPage.svelte"
  import PopoverPage from "../pages/PopoverPage.svelte"
  import ProgressIndicatorPage from "../pages/ProgressIndicatorPage.svelte"
  import RadioPage from "../pages/RadioPage.svelte"
  import SideMenuPage from "../pages/SideMenuPage.svelte"
  import SkeletonPage from "../pages/SkeletonPage.svelte"
  import SpacerPage from "../pages/SpacerPage.svelte"
  import TablePage from "../pages/TablePage.svelte"
  import TabsPage from "../pages/TabsPage.svelte"
  import TextareaPage from "../pages/TextareaPage.svelte"
  import TextFieldPage from "../pages/TextFieldPage.svelte"
  import TooltipPage from "../pages/TooltipPage.svelte"
  
  let hash: string = "#";

  onMount(() => {
    hash = window.location.hash;
    window.addEventListener("hashchange", (e) => {
      // @ts-expect-error
      hash = e.target?.location?.hash;
    })  
  })  

</script>

<svelte:head>
  <title>GoA Component Playground</title>
</svelte:head>

<goa-one-column-layout>
  <section slot="header">
    <goa-microsite-header type="alpha"></goa-microsite-header>
    <goa-app-header
      heading="Child services"
      url="foo.com"
      maxcontentwidth="1024px"
    >
      <a href="#learnmore">Learn more</a>
      <a href="#aboutus">About Us</a>
      <goa-app-header-menu heading="Apply Now">
        <a href="#seniors">Seniors</a>
        <a href="#family">Family</a>
      </goa-app-header-menu>
      <goa-app-header-menu
        heading="Mary Smith"
        leadingicon="person-circle"
        type="secondary"
      >
        <a href="#settings">Settings</a>
        <a class="interactive" href="#signout">Sign out</a>
      </goa-app-header-menu>
    </goa-app-header>
  </section>

  <section style="display: flex; gap: 2rem;">
    <div style="width: 240px">
      <goa-side-menu>
        <goa-side-menu-heading>Components</goa-side-menu-heading>
        <a href="#accordion">Accordion</a>
        <a href="#badge">Badge</a>
        <a href="#block">Block</a>
        <a href="#button">Button</a>
        <a href="#button-group">Button Group</a>
        <a href="#callout">Callout</a>
        <a href="#checkbox">Checkbox</a>
        <a href="#chip">Chip</a>
        <a href="#container">Container</a>
        <a href="#datepicker">Datepicker</a>
        <a href="#details">Details</a>
        <a href="#dividier">Dividier</a>
        <a href="#dropdown">Dropdown</a>
        <a href="#file-uploader">File Uploader</a>
        <a href="#footer">Footer</a>
        <a href="#form-item">Form Item</a>
        <a href="#form-stepper">Form Stepper</a>
        <a href="#grid">Grid</a>
        <a href="#header">Header</a>
        <a href="#hero-banner">Hero</a>
        <a href="#icons">Icons</a>
        <a href="#icon-button">Icon Button</a>
        <a href="#list">List</a>
        <a href="#microsite-header">Microsite Header</a>
        <a href="#modal">Modal</a>
        <a href="#notification-banner">Notification Banner</a>
        <a href="#pagination">Pagination</a>
        <a href="#popover">Popover</a>
        <a href="#progress-indicator">Progress</a>
        <a href="#radio">Radio</a>
        <a href="#side-menu">Side Menu</a>
        <a href="#skeleton">Skeleton</a>
        <a href="#spacer">Spacer</a>
        <a href="#table">Table</a>
        <a href="#tabs">Tabs</a>
        <a href="#textarea">Textarea</a>
        <a href="#textfield">Textfield</a>
        <a href="#tooltip">Tooltip</a>
      </goa-side-menu>
    </div>

    <div style="flex: 1 1 calc(100vw - 240px); padding: 2rem;">

      {#if hash === "#accordion"}
        <AccordianPage />
      {:else if hash === "#badge"}
        <BadgePage />
      {:else if hash === "#block"}
        <BlockPage />
      {:else if hash === "#button"}
        <ButtonPage />
      {:else if hash === "#button-group"}
        <ButtonGroupPage />
      {:else if hash === "#callout"}
        <CalloutPage />
      {:else if hash === "#checkbox"}
        <CheckboxPage />
      {:else if hash === "#chip"}
        <ChipPage />
      {:else if hash === "#container"}
        <ContainerPage />
      {:else if hash === "#datepicker"}
        <DatePickerPage />
      {:else if hash === "#details"}
        <DetailsPage />
      {:else if hash === "#dividier"}
        <DividerPage />
      {:else if hash === "#dropdown"}
        <DropdownPage />
      {:else if hash === "#file-uploader"}
        <FileUploaderPage />
      {:else if hash === "#footer"}
        <FooterPage />
      {:else if hash === "#form-item"}
        <FormItemPage />
      {:else if hash === "#form-stepper"}
        <FormStepperPage />
      {:else if hash === "#grid"}
        <GridPage />
      {:else if hash === "#header"}
        <HeaderPage />
      {:else if hash === "#hero-banner"}
        <HeroBannerPage />
      {:else if hash === "#icons"}
        <IconPage />
      {:else if hash === "#icon-button"}
        <IconButtonPage />
      {:else if hash === "#list"}
        <ListPage />
      {:else if hash === "#microsite-header"}
        <MicrositeHeaderPage />
      {:else if hash === "#modal"}
        <ModalPage />
      {:else if hash === "#notification-banner"}
        <NotificationBannerPage />
      {:else if hash === "#pagination"}
        <PaginationPage />
      {:else if hash === "#popover"}
        <PopoverPage />
      {:else if hash === "#progress-indicator"}
        <ProgressIndicatorPage />
      {:else if hash === "#radio"}
        <RadioPage />
      {:else if hash === "#side-menu"}
        <SideMenuPage />
      {:else if hash === "#skeleton"}
        <SkeletonPage />
      {:else if hash === "#spacer"}
        <SpacerPage />
      {:else if hash === "#table"}
        <TablePage />
      {:else if hash === "#tabs"}
        <TabsPage />
      {:else if hash === "#textarea"}
        <TextareaPage />
      {:else if hash === "#textfield"}
        <TextFieldPage />
      {:else if hash === "#tooltip"}
        <TooltipPage />
      {/if}
      
    </div>
  </section>

  <section slot="footer">
    <goa-app-footer />
  </section>
</goa-one-column-layout>
