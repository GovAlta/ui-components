/**
 * IMPORTANT: Do NOT export experimental components in this file.
 */

import '@abgov/web-components';

import {
  GoABadge,
  GoAInfoBadge,
  GoAEmergencyBadge,
  GoASuccessBadge,
  GoAWarningBadge,
} from './lib/badge/badge';

import {
  GoAInput,
  GoAInputText,
  GoAInputPassword,
  GoAInputDate,
  GoAInputTime,
  GoAInputDateTime,
  GoAInputEmail,
  GoAInputSearch,
  GoAInputUrl,
  GoAInputTel,
  GoAInputFile,
  GoAInputMonth,
  GoAInputNumber,
  GoAInputRange,
} from './lib/input/input';

import { GoAAppHeader } from './lib/app-header/app-header';
import { GoAAppFooter } from './lib/app-footer/app-footer';
import { GoAMetaLink } from './lib/app-footer/meta-link';
import { GoANavigationLink } from './lib/app-footer/navigation-link';
import { GoAButton } from './lib/button/button';
import { GoAButtonGroup } from './lib/button-group/button-group';
import { GoACallout } from './lib/callout/callout';
import { GoACheckbox } from './lib/checkbox/checkbox';
import { GoAChip } from './lib/chip/chip';
import { GoACircularProgress } from './lib/circular-progress/circular-progress';
import { GoAContainer } from './lib/container/container';
import { GoADropdown, GoADropdownOption } from './lib/dropdown/dropdown';
import { GoAFlexRow } from './lib/flex-row/flex-row';
import { GoAFormItem } from './lib/form';
import { GoAHeroBanner } from './lib/hero-banner/hero-banner';
import { GoAHeroBannerActions } from './lib/hero-banner/hero-banner-actions';
import { GoAIcon, GoAIconButton } from './lib/icons';
import { GoAMicrositeHeader } from './lib/microsite-header/microsite-header';
import { GoAModal } from './lib/modal/modal';
import { GoANotification } from './lib/notification/notification';
import { GoAPageBlock } from './lib/page-block/page-block';
import { GoARadioGroup, GoARadioItem } from './lib/radio-group/radio-group';
import { GoASkeleton } from './lib/skeleton/skeleton';
import { GoASpinner } from './lib/spinner/spinner';
import { GoATextArea } from './lib/textarea/textarea';

// Types
import type { GoAIconType } from './lib/icons';
// import type { BadgeType as GoABadgeType } from '@abgov/shared-common'
import type { GoABadgeType } from './lib/badge/badge';

export * from './lib/flex-column/flex-column';

export * from './lib/page/page';

export * from './lib/divider/divider';

export type { GoAIconType };
export type { GoABadgeType };

export {
  GoAAppHeader,
  GoAAppFooter,
  GoAMetaLink,
  GoANavigationLink,
  GoABadge,
  GoAButton,
  GoAButtonGroup,
  GoACallout,
  GoACheckbox,
  GoAChip,
  GoACircularProgress,
  GoAContainer,
  GoADropdown,
  GoADropdownOption,
  GoAEmergencyBadge,
  GoAFlexRow,
  GoAFormItem,
  GoAHeroBanner,
  GoAHeroBannerActions,
  GoAIcon,
  GoAIconButton,
  GoAInfoBadge,
  GoAInput,
  GoAInputDate,
  GoAInputDateTime,
  GoAInputEmail,
  GoAInputFile,
  GoAInputMonth,
  GoAInputNumber,
  GoAInputPassword,
  GoAInputRange,
  GoAInputSearch,
  GoAInputTel,
  GoAInputText,
  GoAInputTime,
  GoAInputUrl,
  GoAMicrositeHeader,
  GoAModal,
  GoANotification,
  GoAPageBlock,
  GoARadioGroup,
  GoARadioItem,
  GoASkeleton,
  GoASpinner,
  GoASuccessBadge,
  GoATextArea,
  GoAWarningBadge,
};
