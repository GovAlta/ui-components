<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";
import {
  GoabAccordion,
  GoabAppFooter,
  GoabAppFooterMetaSection,
  GoabAppFooterNavSection,
  GoabAppHeader,
  GoabAppHeaderMenu,
  GoabBadge,
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabCalendar,
  GoabCallout,
  GoabCheckbox,
  GoabCheckboxList,
  GoabCircularProgress,
  GoabContainer,
  GoabDataGrid,
  GoabDatePicker,
  GoabDetails,
  GoabDivider,
  GoabDrawer,
  GoabDropdown,
  GoabDropdownItem,
  GoabFileUploadCard,
  GoabFileUploadInput,
  GoabFilterChip,
  GoabFormItem,
  GoabGrid,
  GoabHeroBanner,
  GoabIcon,
  GoabIconButton,
  GoabInput,
  GoabLink,
  GoabLinearProgress,
  GoabMenuAction,
  GoabMenuButton,
  GoabMicrositeHeader,
  GoabModal,
  GoabNotification,
  GoabOneColumnLayout,
  GoabPageBlock,
  GoabPages,
  GoabPagination,
  GoabPopover,
  GoabRadioGroup,
  GoabRadioItem,
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabSideMenuHeading,
  GoabSkeleton,
  GoabSpacer,
  GoabTab,
  GoabTable,
  GoabTableSortHeader,
  GoabTabs,
  GoabText,
  GoabTextarea,
  GoabTooltip,
} from "@abgov/vue-components";
import {
  GoabBadgeType,
  GoabButtonSize,
  GoabButtonType,
  GoabButtonVariant,
  GoabCalloutIconTheme,
  GoabCalloutType,
  GoabCheckboxListOnChangeDetail,
  GoabCheckboxOnChangeDetail,
  GoabCircularProgressSize,
  GoabCircularProgressVariant,
  GoabContainerAccent,
  GoabContainerPadding,
  GoabContainerType,
  GoabContainerWidth,
  GoabDatePickerInputType,
  GoabDrawerPosition,
  GoabDropdownItemMountType,
  GoabDropdownOnChangeDetail,
  GoabFileUploadInputOnSelectFileDetail,
  GoabFileUploadOnCancelDetail,
  GoabFileUploadOnDeleteDetail,
  GoabIconButtonVariant,
  GoabIconSize,
  GoabIconType,
  GoabModalCalloutVariant,
  GoabNotificationType,
  GoabPaginationOnChangeDetail,
  GoabPopoverPosition,
  GoabRadioGroupOnChangeDetail,
  GoabSkeletonSize,
  GoabSkeletonType,
  GoabTabsOnChangeDetail,
  GoabTextColor,
  GoabTextSize,
  GoabTooltipHorizontalAlignment,
  GoabTooltipPosition,
  GoabFilterChipTheme,
  GoabFormItemLabelSize,
  GoabDatePickerOnChangeDetail,
  GoabCalendarOnChangeDetail,
} from "@abgov/ui-components-common";

const router = useRouter();

const BADGE_TYPES: GoabBadgeType[] = ["information", "success", "important", "emergency", "archived", "sky", "prairie", "lilac", "pasture", "sunset", "dawn", "default"];
const BUTTON_TYPES: GoabButtonType[] = ["primary", "submit", "secondary", "tertiary", "start"];
const BUTTON_VARIANTS: GoabButtonVariant[] = ["normal", "destructive", "inverse"];
const BUTTON_SIZES: GoabButtonSize[] = ["normal", "compact"];
const CALLOUT_TYPES: GoabCalloutType[] = ["information", "success", "important", "emergency", "event"];
const CALLOUT_ICON_THEMES: GoabCalloutIconTheme[] = ["outline", "filled"];
const CIRCULAR_PROGRESS_VARIANTS: GoabCircularProgressVariant[] = ["inline", "fullscreen"];
const CIRCULAR_PROGRESS_SIZES: GoabCircularProgressSize[] = ["small", "large"];
const CONTAINER_TYPES: GoabContainerType[] = ["interactive", "non-interactive", "info", "error", "success", "important"];
const CONTAINER_ACCENTS: Array<GoabContainerAccent | undefined> = [undefined, "thin", "thick", "filled"];
const CONTAINER_PADDINGS: GoabContainerPadding[] = ["compact", "relaxed"];
const CONTAINER_WIDTHS: GoabContainerWidth[] = ["content", "full"];
const DATE_PICKER_INPUTS: GoabDatePickerInputType[] = ["calendar", "input"];
const DROPDOWN_MOUNT_TYPES: GoabDropdownItemMountType[] = ["append", "prepend", "reset"];
const FILTER_CHIP_THEMES: GoabFilterChipTheme[] = ["outline", "filled"];
const FORM_ITEM_LABEL_SIZES: GoabFormItemLabelSize[] = ["regular", "large"];
const ICON_BUTTON_VARIANTS: GoabIconButtonVariant[] = ["color", "nocolor", "dark", "light", "destructive"];
const ICON_TYPES: GoabIconType[] = ["home", "alert", "checkmark-circle", "information-circle", "menu"];
const POPOVER_POSITIONS: GoabPopoverPosition[] = ["auto", "above", "below"];
const NOTIFICATION_TYPES: GoabNotificationType[] = ["information", "important", "emergency", "event"];
const MODAL_CALLOUT_VARIANTS: GoabModalCalloutVariant[] = ["information", "important", "emergency", "success", "event"];
const SKELETON_TYPES: GoabSkeletonType[] = ["text", "title", "text-small", "avatar", "header", "paragraph", "thumbnail", "card", "profile"];
const SKELETON_SIZES: GoabSkeletonSize[] = ["1", "2", "3", "4"];
const TOOLTIP_POSITIONS: GoabTooltipPosition[] = ["top", "bottom", "left", "right"];
const TOOLTIP_ALIGNMENTS: GoabTooltipHorizontalAlignment[] = ["left", "center", "right"];
const TEXT_SIZES: GoabTextSize[] = ["heading-xl", "heading-l", "heading-m", "heading-s", "heading-xs", "body-l", "body-m", "body-s", "body-xs"];
const TEXT_COLORS: GoabTextColor[] = ["primary", "secondary"];
const TABLE_DATA = [
  { name: "Alpha", created: "2024-02-14", status: "Active", progress: 68 },
  { name: "Beta", created: "2023-11-08", status: "Paused", progress: 34 },
  { name: "Gamma", created: "2024-05-22", status: "Active", progress: 82 },
];

const eventLog = ref<Array<{ name: string; detail: unknown; timestamp: string }>>([]);
const logEvent = (name: string, detail: unknown) => {
  eventLog.value = [{ name, detail, timestamp: new Date().toISOString() }, ...eventLog.value].slice(0, 50);
};

const checkboxValue = ref(false);
const checkboxListSelection = ref<string[]>([]);
const dropdownSelection = ref<string | undefined>();
const dropdownMultiSelection = ref<string[]>([]);
const selectedRadio = ref("option-1");
const datePickerValue = ref("2025-05-15");
const textInputValue = ref("Sample value");
const textareaValue = ref("Sample multiline text\nsecond line");
const calendarSelectedDate = ref<string | undefined>();
const paginationState = reactive({ page: 1, perPage: 10, total: 75 });
const tabsState = ref(1);
const drawerState = reactive({ open: false, position: "right" as GoabDrawerPosition });
const modalOpen = ref(false);
const notificationDismissed = ref(false);
const accordionLastToggle = ref<{ heading: string; open: boolean }>();
const filterChipClicks = ref(0);
const fileUploadCardEvents = ref<string[]>([]);
const fileUploadInputFiles = ref<string[]>([]);
const headerMenuActivated = ref(false);
const iconButtonClickCount = reactive<Record<string, number>>({ color: 0, nocolor: 0, dark: 0, light: 0, destructive: 0 });
const textInputTrailingClicks = ref(0);
const menuAction = ref<string | undefined>();

const popoverTarget = ref();
const badge = ref();
</script>

<template>
  <GoabBlock gap="xl" direction="column">
    <GoabText tag="h1" size="heading-l">All Components - Vue Component Showcase</GoabText>
    <GoabText tag="p" size="body-m">This page tests every Vue wrapper component to verify rendering, props, events, and slots.</GoabText>

    <!-- Event Log -->
    <GoabDetails maxWidth="100%" heading="Event Log" open>
      <GoabBlock gap="s" direction="column">
        <GoabText tag="h3" size="heading-s">Recent events</GoabText>
        <GoabBlock gap="2xs" direction="column">
          <GoabText v-if="eventLog.length === 0" tag="p" size="body-s">Interact with the components to populate the log.</GoabText>
          <GoabContainer v-for="(entry, index) in eventLog" :key="entry.timestamp + '-' + index" type="interactive" padding="relaxed" mb="xs">
            <GoabBlock gap="xs" direction="column">
              <GoabText tag="p" size="body-s"><strong>{{ entry.timestamp }}</strong> - {{ entry.name }}</GoabText>
              <pre style="font-size: 12px; white-space: pre-wrap; margin: 0">{{ JSON.stringify(entry.detail, null, 2) }}</pre>
            </GoabBlock>
          </GoabContainer>
        </GoabBlock>
      </GoabBlock>
    </GoabDetails>

    <!-- Layout & Typography -->
    <GoabDetails maxWidth="100%" heading="Layout &amp; Typography" open>
      <GoabBlock gap="l" direction="column">
        <GoabGrid minChildWidth="220px" gap="m">
          <GoabContainer type="interactive" padding="relaxed">
            <GoabText tag="h3" size="heading-s">Text sizes</GoabText>
            <GoabBlock gap="xs" direction="column">
              <GoabText v-for="size in TEXT_SIZES" :key="size" :tag="size.startsWith('heading') ? 'h4' : 'p'" :size="size">{{ size }}</GoabText>
            </GoabBlock>
          </GoabContainer>
          <GoabContainer type="interactive" padding="relaxed">
            <GoabText tag="h3" size="heading-s">Text colors</GoabText>
            <GoabBlock gap="xs" direction="column">
              <GoabText v-for="color in TEXT_COLORS" :key="color" tag="p" size="body-m" :color="color">{{ color.charAt(0).toUpperCase() + color.slice(1) }} text</GoabText>
            </GoabBlock>
          </GoabContainer>
          <GoabContainer type="interactive" padding="relaxed">
            <GoabText tag="h3" size="heading-s">Block variations</GoabText>
            <GoabBlock gap="xs" direction="column">
              <GoabBlock gap="m" direction="row">
                <GoabBadge type="information" content="Row layout" />
                <GoabBadge type="success" content="Gap m" />
              </GoabBlock>
              <GoabBlock gap="xs" direction="column" alignment="center">
                <GoabBadge type="important" content="Column layout" />
                <GoabBadge type="success" content="Centered" />
              </GoabBlock>
            </GoabBlock>
          </GoabContainer>
        </GoabGrid>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Containers</GoabText>
          <GoabGrid minChildWidth="240px" gap="m">
            <GoabContainer v-for="(type, index) in CONTAINER_TYPES" :key="type" :type="type" :accent="CONTAINER_ACCENTS[index % CONTAINER_ACCENTS.length]" :padding="CONTAINER_PADDINGS[index % CONTAINER_PADDINGS.length]" :width="CONTAINER_WIDTHS[index % CONTAINER_WIDTHS.length]">
              <GoabText tag="p" size="body-m">Type: {{ type }}<br />Accent: {{ CONTAINER_ACCENTS[index % CONTAINER_ACCENTS.length] || "none" }}</GoabText>
            </GoabContainer>
          </GoabGrid>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Grid &amp; Layout</GoabText>
          <GoabOneColumnLayout>
            <GoabGrid minChildWidth="180px" gap="s" mt="s">
              <GoabPageBlock width="content">
                <GoabText tag="h4" size="heading-xs">Responsive grid</GoabText>
                <GoabText tag="p" size="body-m">Grid with minChildWidth wraps automatically.</GoabText>
              </GoabPageBlock>
              <GoabContainer type="info">
                <GoabText tag="p" size="body-m">Layout provides readable widths.</GoabText>
              </GoabContainer>
              <GoabContainer type="important" accent="filled">
                <GoabText tag="p" size="body-m">Padding tokens for spacing.</GoabText>
              </GoabContainer>
            </GoabGrid>
          </GoabOneColumnLayout>
        </GoabContainer>


        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Spacers &amp; Pages</GoabText>
          <GoabBlock gap="m" direction="row">
            <GoabBlock gap="xs" direction="column">
              <GoabText tag="h4" size="heading-xs">Spacer samples</GoabText>
              <GoabBlock direction="row" gap="none" alignment="center">
                <GoabText tag="span" size="body-s">Left</GoabText>
                <GoabSpacer hSpacing="fill" />
                <GoabText tag="span" size="body-s">Right</GoabText>
              </GoabBlock>
              <GoabBlock direction="column" gap="3xs">
                <GoabText tag="span" size="body-s">Vertical spacer:</GoabText>
                <GoabSpacer vSpacing="l" />
                <GoabBadge type="success" content="Space applied" />
              </GoabBlock>
            </GoabBlock>
            <GoabBlock gap="xs" direction="column">
              <GoabText tag="h4" size="heading-xs">Pages</GoabText>
              <GoabPages :current="2">
                <a href="#">Overview</a>
                <a href="#">Details</a>
                <a href="#">History</a>
              </GoabPages>
            </GoabBlock>
          </GoabBlock>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>

    <!-- Buttons & Actions -->
    <GoabDetails maxWidth="100%" heading="Buttons &amp; Actions" open>
      <GoabBlock gap="l" direction="column">
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Buttons by type</GoabText>
          <GoabGrid minChildWidth="160px" gap="m">
            <GoabButton v-for="type in BUTTON_TYPES" :key="type" :type="type" @onClick="logEvent('button.click', { type })">{{ type.charAt(0).toUpperCase() + type.slice(1) }}</GoabButton>
          </GoabGrid>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Variants &amp; sizes</GoabText>
          <GoabBlock gap="m" direction="column">
            <GoabBlock v-for="variant in BUTTON_VARIANTS" :key="variant" gap="s" direction="row" alignment="center">
              <GoabText tag="span" size="body-m">{{ variant.charAt(0).toUpperCase() + variant.slice(1) }}</GoabText>
              <GoabButton v-for="size in BUTTON_SIZES" :key="`${variant}-${size}`" type="primary" :variant="variant" :size="size" @onClick="logEvent('button.click', { type: 'primary', variant, size })">{{ size }} / {{ variant }}</GoabButton>
            </GoabBlock>
          </GoabBlock>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Button group &amp; links</GoabText>
          <GoabBlock gap="m" direction="row" alignment="center">
            <GoabButtonGroup alignment="center" gap="relaxed">
              <GoabButton type="primary" @onClick="logEvent('button.click', { type: 'primary' })">Primary</GoabButton>
              <GoabButton type="secondary" @onClick="logEvent('button.click', { type: 'secondary' })">Secondary</GoabButton>
              <GoabButton type="tertiary" @onClick="logEvent('button.click', { type: 'tertiary' })">Tertiary</GoabButton>
            </GoabButtonGroup>
            <GoabBlock gap="xs" direction="column">
              <GoabLink action="primary" @onClick="logEvent('link.click', { action: 'primary' })">Primary link</GoabLink>
              <GoabLink action="secondary" @onClick="logEvent('link.click', { action: 'secondary' })">Secondary link</GoabLink>
            </GoabBlock>
          </GoabBlock>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Icon buttons &amp; icons</GoabText>
          <GoabGrid minChildWidth="160px" gap="m">
            <GoabIconButton v-for="(variant, index) in ICON_BUTTON_VARIANTS" :key="variant" :variant="variant" :icon="ICON_TYPES[index % ICON_TYPES.length]" @onClick="iconButtonClickCount[variant]++; logEvent('iconButton.click', { variant, count: iconButtonClickCount[variant] })" />
          </GoabGrid>
          <GoabText tag="p" size="body-s">Click counts: {{ JSON.stringify(iconButtonClickCount) }}</GoabText>
          <GoabGrid minChildWidth="120px" gap="s" mt="s">
            <GoabIcon v-for="(icon, index) in ICON_TYPES" :key="icon + '-' + index" :type="icon" :size="((index % 6) + 1).toString() as GoabIconSize" :theme="index % 2 === 0 ? 'outline' : 'filled'" />
          </GoabGrid>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Menu button</GoabText>
          <GoabMenuButton text="Download" @onAction="(detail: any) => { menuAction = detail.action; logEvent('menu.action', detail); }">
            <GoabMenuAction text="CSV (Filtered)" action="csv-filtered" />
            <GoabMenuAction text="CSV (All)" action="csv-all" />
            <GoabMenuAction text="JSON (Filtered)" action="json-filtered" />
            <GoabMenuAction text="JSON (All)" action="json-all" />
          </GoabMenuButton>
          <GoabText tag="p" size="body-s" mt="s">Latest menu action: <strong>{{ menuAction || "pending" }}</strong></GoabText>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>

    <!-- Indicators & Chips -->
    <GoabDetails maxWidth="100%" heading="Indicators &amp; Chips" open>
      <GoabBlock gap="l" direction="column">
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Badge palette</GoabText>
          <GoabGrid minChildWidth="140px" gap="s">
            <GoabBadge v-for="badgeType in BADGE_TYPES" :key="badgeType" :type="badgeType" :content="badgeType" />
          </GoabGrid>
        </GoabContainer>


        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Filter chips</GoabText>
          <GoabBlock gap="m" direction="row">
            <GoabFilterChip v-for="theme in FILTER_CHIP_THEMES" :key="theme" :content="theme + ' theme'" :iconTheme="theme" @onClick="filterChipClicks++; logEvent('filterChip.click', { theme })" />
          </GoabBlock>
          <GoabText tag="p" size="body-s">Filter chip clicks: {{ filterChipClicks }}</GoabText>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>

    <!-- Form Controls -->
    <GoabDetails maxWidth="100%" heading="Form Controls" open>
      <GoabBlock gap="l" direction="column">
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Inputs</GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem label="Standard input" requirement="required">
              <GoabInput name="standard-input" placeholder="Type here…" :value="textInputValue" leadingIcon="search" trailingIcon="close" @onChange="(detail: any) => { textInputValue = detail.value; logEvent('input.change', detail); }" @onTrailingIconClick="textInputTrailingClicks++; logEvent('input.trailingIconClick', { count: textInputTrailingClicks })" />
            </GoabFormItem>
            <GoabFormItem v-for="size in FORM_ITEM_LABEL_SIZES" :key="size" :label="'Label ' + size" :labelSize="size" requirement="optional">
              <GoabInput :name="'input-' + size" :placeholder="'Label size: ' + size" @onChange="logEvent('input.change', { labelSize: size })" />
            </GoabFormItem>
          </GoabGrid>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Textarea</GoabText>
          <GoabFormItem label="Textarea" :helpText="'Length: ' + textareaValue.length + ' chars'">
            <GoabTextarea name="notes" :value="textareaValue" placeholder="Enter notes" :rows="4" @onChange="(detail: any) => { textareaValue = detail.value; logEvent('textarea.change', detail); }" />
          </GoabFormItem>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Checkboxes &amp; radio</GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem label="Single checkbox">
              <GoabCheckbox name="single-checkbox" value="agree" text="I agree" :checked="checkboxValue" @onChange="(detail: GoabCheckboxOnChangeDetail) => { checkboxValue = detail.checked; logEvent('checkbox.change', detail); }" />
            </GoabFormItem>
            <GoabFormItem label="Checkbox list">
              <GoabCheckboxList name="fruits" :value="checkboxListSelection" @onChange="(detail: GoabCheckboxListOnChangeDetail) => { checkboxListSelection = detail.value || []; logEvent('checkboxList.change', detail); }">
                <GoabCheckbox name="apples" value="apples" text="Apples" />
                <GoabCheckbox name="bananas" value="bananas" text="Bananas" />
                <GoabCheckbox name="pears" value="pears" text="Pears" />
              </GoabCheckboxList>
            </GoabFormItem>
            <GoabFormItem label="Radio group">
              <GoabRadioGroup name="delivery" :value="selectedRadio" orientation="horizontal" @onChange="(detail: GoabRadioGroupOnChangeDetail) => { selectedRadio = detail.value; logEvent('radio.change', detail); }">
                <GoabRadioItem value="option-1" label="Pickup" />
                <GoabRadioItem value="option-2" label="Delivery" />
                <GoabRadioItem value="option-3" label="Courier" disabled />
              </GoabRadioGroup>
            </GoabFormItem>
          </GoabGrid>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Dropdowns</GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem label="Single select">
              <GoabDropdown name="countries" placeholder="Select ..." filterable @onChange="(detail: GoabDropdownOnChangeDetail) => { dropdownSelection = detail.value; logEvent('dropdown.change', detail); }">
                <GoabDropdownItem value="ca" label="Canada" />
                <GoabDropdownItem value="us" label="United States" />
                <GoabDropdownItem value="mx" label="Mexico" />
              </GoabDropdown>
            </GoabFormItem>
            <GoabFormItem label="Multi select">
              <GoabDropdown name="mounts" placeholder="Select mounts" multiselect :value="dropdownMultiSelection" @onChange="(detail: GoabDropdownOnChangeDetail) => { dropdownSelection = detail.value; dropdownMultiSelection = detail.values || []; logEvent('dropdown.change', detail); }">
                <GoabDropdownItem v-for="mount in DROPDOWN_MOUNT_TYPES" :key="mount" :value="mount" :label="mount" :mountType="mount" />
              </GoabDropdown>
            </GoabFormItem>
          </GoabGrid>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Date controls</GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem label="Date picker (calendar)">
              <GoabDatePicker name="reviewDate" :value="datePickerValue" :type="DATE_PICKER_INPUTS[0]" @onChange="(detail: GoabDatePickerOnChangeDetail) => { datePickerValue = (detail.value || '').toString(); logEvent('datePicker.change', detail); }" />
            </GoabFormItem>
            <GoabFormItem label="Date picker (input)">
              <GoabDatePicker name="nextDate" :value="datePickerValue" :type="DATE_PICKER_INPUTS[1]" @onChange="(detail: GoabDatePickerOnChangeDetail) => { datePickerValue = (detail.value || '').toString(); logEvent('datePicker.input', detail); }" />
            </GoabFormItem>
            <GoabFormItem label="Calendar" :helpText="'Selected: ' + (calendarSelectedDate || 'None')">
              <GoabCalendar name="calendar-demo" @onChange="(detail: GoabCalendarOnChangeDetail) => { calendarSelectedDate = detail.value; logEvent('calendar.change', detail); }" />
            </GoabFormItem>
          </GoabGrid>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">File upload</GoabText>
          <GoabGrid minChildWidth="320px" gap="l">
            <GoabFormItem label="File upload input">
              <GoabFileUploadInput variant="dragdrop" accept=".pdf,.docx" maxFileSize="1.2 MB" @onSelectFile="(detail: GoabFileUploadInputOnSelectFileDetail) => { const name = detail.file?.name; if (name) fileUploadInputFiles = [name, ...fileUploadInputFiles].slice(0, 5); logEvent('fileUploadInput.select', { name, size: detail.file?.size, type: detail.file?.type }); }" />
            </GoabFormItem>
            <GoabFormItem label="Upload card">
              <GoabFileUploadCard filename="budget.xlsx" :size="1.5" @onCancel="(detail: GoabFileUploadOnCancelDetail) => { fileUploadCardEvents = ['Cancelled: ' + detail.filename, ...fileUploadCardEvents].slice(0, 5); logEvent('fileUploadCard.cancel', detail); }" @onDelete="(detail: GoabFileUploadOnDeleteDetail) => { fileUploadCardEvents = ['Deleted: ' + detail.filename, ...fileUploadCardEvents].slice(0, 5); logEvent('fileUploadCard.delete', detail); }" />
            </GoabFormItem>
          </GoabGrid>
        </GoabContainer>

      </GoabBlock>
    </GoabDetails>

    <!-- Feedback & Overlays -->
    <GoabDetails maxWidth="100%" heading="Feedback &amp; Overlays" open>
      <GoabBlock gap="l" direction="column">
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Callouts</GoabText>
          <GoabGrid minChildWidth="260px" gap="m">
            <GoabCallout v-for="(type, index) in CALLOUT_TYPES" :key="type" :type="type" :heading="type.charAt(0).toUpperCase() + type.slice(1)" :iconTheme="CALLOUT_ICON_THEMES[index % CALLOUT_ICON_THEMES.length]">
              <GoabText tag="p" size="body-m">This is a {{ type }} callout using the {{ CALLOUT_ICON_THEMES[index % CALLOUT_ICON_THEMES.length] }} icon theme.</GoabText>
            </GoabCallout>
          </GoabGrid>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Notifications</GoabText>
          <GoabNotification v-for="type in NOTIFICATION_TYPES" :key="type" :type="type" maxContentWidth="480px" @onDismiss="notificationDismissed = true; logEvent('notification.dismiss', {})">
            {{ type.charAt(0).toUpperCase() + type.slice(1) }} notification.
          </GoabNotification>
          <GoabText tag="p" size="body-s" mt="s">Dismissed: {{ notificationDismissed }}</GoabText>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Modal &amp; Drawer</GoabText>
          <GoabBlock gap="m" direction="row">
            <GoabButton type="primary" @onClick="modalOpen = true">Open Modal</GoabButton>
            <GoabButton type="tertiary" @onClick="drawerState.open = !drawerState.open">Toggle Drawer</GoabButton>
          </GoabBlock>
          <GoabModal heading="Standard modal" :open="modalOpen" @onClose="modalOpen = false">
            <GoabText tag="p" size="body-m">Standard modal content.</GoabText>
          </GoabModal>
          <GoabDrawer :open="drawerState.open" :position="drawerState.position" heading="Account drawer" @onClose="drawerState.open = false">
            <GoabText tag="p" size="body-m">Drawer body content.</GoabText>
          </GoabDrawer>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Tooltip &amp; Popover</GoabText>
          <GoabBlock gap="l" direction="row">
            <GoabTooltip v-for="pos in TOOLTIP_POSITIONS" :key="pos" :position="pos" content="Tooltip content" hAlign="center">
              <GoabButton type="secondary">Tooltip {{ pos }}</GoabButton>
            </GoabTooltip>
          </GoabBlock>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Progress &amp; Skeletons</GoabText>
          <GoabGrid minChildWidth="200px" gap="m">
            <GoabBlock direction="column" gap="xs">
              <GoabText tag="div" size="body-m">Circular progress</GoabText>
              <GoabCircularProgress v-for="(variant, index) in CIRCULAR_PROGRESS_VARIANTS" :key="variant + '-' + index" :variant="variant" :size="CIRCULAR_PROGRESS_SIZES[index % CIRCULAR_PROGRESS_SIZES.length]" :progress="65" />
              <GoabText tag="div" size="body-s" mt="xs">Linear Progress</GoabText>
              <GoabLinearProgress :progress="75" ariaLabel="Determinate" />
              <GoabLinearProgress ariaLabel="Indeterminate" />
            </GoabBlock>
            <GoabBlock direction="column" gap="xs">
              <GoabText tag="span" size="body-m">Skeletons</GoabText>
              <GoabSkeleton v-for="(type, index) in SKELETON_TYPES" :key="type + '-' + index" :type="type" :size="SKELETON_SIZES[index % SKELETON_SIZES.length]" :lineCount="index + 1" />
            </GoabBlock>
          </GoabGrid>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>

    <!-- Navigation & Data -->
    <GoabDetails maxWidth="100%" heading="Navigation &amp; Data" open>
      <GoabBlock gap="l" direction="column">
        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Accordion &amp; Tabs</GoabText>
          <GoabGrid minChildWidth="320px" gap="m">
            <GoabAccordion heading="Accordion 1" headingSize="small" @onToggle="(open: boolean) => { accordionLastToggle = { heading: 'Accordion 1', open }; logEvent('accordion.change', { heading: 'Accordion 1', open }); }">
              <GoabText tag="p" size="body-m">Accordion content for small heading.</GoabText>
            </GoabAccordion>
            <GoabAccordion heading="Accordion 2" headingSize="medium" open @onToggle="(open: boolean) => { accordionLastToggle = { heading: 'Accordion 2', open }; logEvent('accordion.change', { heading: 'Accordion 2', open }); }">
              <GoabText tag="p" size="body-m">Accordion content for medium heading.</GoabText>
            </GoabAccordion>
          </GoabGrid>
          <GoabText tag="p" size="body-s" mt="s">Last toggle: {{ accordionLastToggle?.heading || "None" }} / {{ accordionLastToggle?.open?.toString() || "n/a" }}</GoabText>

          <GoabTabs :initialTab="tabsState" @onChange="(detail: GoabTabsOnChangeDetail) => { tabsState = detail.tab; logEvent('tabs.change', detail); }">
            <GoabTab heading="Overview">
              <GoabText tag="p" size="body-m">Overview content.</GoabText>
            </GoabTab>
            <GoabTab heading="Details">
              <GoabText tag="p" size="body-m">Details content.</GoabText>
            </GoabTab>
            <GoabTab heading="Attachments">
              <GoabText tag="p" size="body-m">Attachments content.</GoabText>
            </GoabTab>
          </GoabTabs>
          <GoabText tag="p" size="body-s" mt="s">Selected tab: {{ tabsState }}</GoabText>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Table &amp; Pagination</GoabText>
          <GoabTable variant="normal" width="100%">
            <table style="width: 100%">
              <thead>
                <tr>
                  <th><GoabTableSortHeader name="name">Name</GoabTableSortHeader></th>
                  <th><GoabTableSortHeader name="created" direction="asc">Created</GoabTableSortHeader></th>
                  <th>Status</th>
                  <th>Progress</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in TABLE_DATA" :key="row.name">
                  <td>{{ row.name }}</td>
                  <td>{{ row.created }}</td>
                  <td>{{ row.status }}</td>
                  <td>{{ row.progress }}%</td>
                </tr>
              </tbody>
            </table>
          </GoabTable>
          <GoabPagination :itemCount="paginationState.total" :perPageCount="paginationState.perPage" :pageNumber="paginationState.page" variant="all" @onChange="(detail: GoabPaginationOnChangeDetail) => { paginationState.page = detail.page; logEvent('pagination.change', detail); }" />
          <GoabText tag="p" size="body-s" mt="s">Page: {{ paginationState.page }} / {{ Math.ceil(paginationState.total / paginationState.perPage) }}</GoabText>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Data Grid</GoabText>
          <GoabDataGrid keyboardNav="table">
            <GoabTable width="100%">
              <table>
                <thead>
                  <tr data-grid="row">
                    <th data-grid="cell">Name</th>
                    <th data-grid="cell">Created</th>
                    <th data-grid="cell">Status</th>
                    <th data-grid="cell">Progress</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in TABLE_DATA" :key="row.name" data-grid="row">
                    <td data-grid="cell">{{ row.name }}</td>
                    <td data-grid="cell">{{ row.created }}</td>
                    <td data-grid="cell"><GoabBadge :type="row.status === 'Active' ? 'success' : 'important'" :content="row.status" /></td>
                    <td data-grid="cell">{{ row.progress }}%</td>
                  </tr>
                </tbody>
              </table>
            </GoabTable>
          </GoabDataGrid>
        </GoabContainer>

        <GoabContainer type="interactive" padding="relaxed">
          <GoabText tag="h3" size="heading-s">Site chrome</GoabText>
          <GoabOneColumnLayout>
            <GoabMicrositeHeader type="alpha" version="UAT" />
            <GoabAppHeader heading="Sample App" @onMenuClick="headerMenuActivated = true; logEvent('header.menuClick', {})">
              <a href="#">Home</a>
              <GoabAppHeaderMenu heading="Menu">
                <a href="#">Item 1</a>
                <a href="#">Item 2</a>
              </GoabAppHeaderMenu>
            </GoabAppHeader>
            <GoabHeroBanner heading="Hero banner" backgroundUrl="https://picsum.photos/1200/400?random=3">
              <GoabText tag="p" size="body-l">Hero banner demonstrates background imagery.</GoabText>
              <template #actions>
                <GoabButton type="primary">Get started</GoabButton>
                <GoabButton type="secondary">Learn more</GoabButton>
              </template>
            </GoabHeroBanner>
            <GoabBlock direction="row" gap="l" mt="m">
              <GoabSideMenu>
                <GoabSideMenuHeading text="Menu heading" icon="home" />
                <GoabSideMenuGroup heading="Group one">
                  <a href="#">Link A</a>
                  <a href="#">Link B</a>
                </GoabSideMenuGroup>
                <a href="#">Loose link</a>
              </GoabSideMenu>
              <GoabPageBlock width="full">
                <GoabText tag="p" size="body-m">Content area with side menu.</GoabText>
              </GoabPageBlock>
            </GoabBlock>
            <GoabAppFooter maxContentWidth="100%">
              <GoabAppFooterNavSection heading="Resources">
                <a href="#">Documentation</a>
                <a href="#">Support</a>
              </GoabAppFooterNavSection>
              <GoabAppFooterMetaSection>
                <GoabText tag="p" size="body-s">Copyright 2025 Government of Alberta</GoabText>
              </GoabAppFooterMetaSection>
            </GoabAppFooter>
          </GoabOneColumnLayout>
          <GoabText tag="p" size="body-s" mt="s">Header menu clicked: {{ headerMenuActivated }}</GoabText>
        </GoabContainer>
      </GoabBlock>
    </GoabDetails>
    <GoabDivider mt="l" mb="l" />

    <GoabContainer type="interactive" padding="relaxed">
      <GoabText tag="h2" size="heading-m">Feature Pages</GoabText>
      <GoabBlock gap="m" direction="row">
        <GoabLink action="primary" @click="router.push('/features/4033')">
          4033 Vue Wrappers Demo
        </GoabLink>
      </GoabBlock>
    </GoabContainer>
  </GoabBlock>
</template>
