/**
 * IMPORTANT: Do NOT export experimental components in this file.
 */

import '@abgov/web-components'

import { GoAAppHeader } from './lib/app-header/app-header';
import { GoABadge, GoAInfoBadge, GoAEmergencyBadge, GoASuccessBadge, GoAWarningBadge } from './lib/badge/badge';
import { GoAButton } from './lib/button/button';
import { GoAButtonGroup } from './lib/button-group/button-group';
import { GoACallout } from './lib/callout/callout';
import { GoACheckbox } from './lib/checkbox/checkbox';
import { GoAContainer } from './lib/container/container';
import { GoADropdown, GoADropdownOption } from './lib/dropdown/dropdown';
import { GoAFlexRow } from './lib/flex';
import { GoAFormItem } from './lib/form';
import { GoAHeroBanner } from './lib/hero-banner/hero-banner';
import { GoAHeroBannerContent } from './lib/hero-banner/hero-banner-content';
import { GoAHeroBannerActions } from './lib/hero-banner/hero-banner-actions';
import { GoAIcon, GoAIconButton } from './lib/icons';
import { GoAInput, GoAInputText, GoAInputPassword, GoAInputDate, GoAInputTime, GoAInputDateTime, GoAInputEmail, GoAInputSearch, GoAInputUrl, GoAInputTel, GoAInputFile, GoAInputMonth, GoAInputNumber, GoAInputRange } from './lib/input/input';
import { GoAModal } from './lib/modal/modal';
import { GoANotification } from './lib/notification/notification';
import { GoAPageLoader } from './lib/page-loader/page-loader';
import { GoARadioGroup, GoARadio } from './lib/radio-group/radio-group';
import { GoAServiceLevelHeader } from './lib/service-level-header/service-level-header';
import { GoATextArea } from './lib/textarea/textarea';

// Types
import type { GoAIconType } from './lib/icons';
// import type { BadgeType as GoABadgeType } from '@abgov/shared-common'
import type { GoABadgeType } from './lib/badge/badge';
export type { GoAIconType };
export type { GoABadgeType };

export {
  GoAAppHeader,
  GoABadge,
  GoAButton,
  GoAButtonGroup,
  GoACallout,
  GoACheckbox,
  GoAContainer,
  GoADropdown,
  GoADropdownOption,
  GoAEmergencyBadge,
  GoAFlexRow,
  GoAFormItem,
  GoAHeroBanner,
  GoAHeroBannerContent,
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
  GoAModal,
  GoANotification,
  GoAPageLoader,
  GoARadio,
  GoARadioGroup,
  GoAServiceLevelHeader,
  GoASuccessBadge,
  GoATextArea,
  GoAWarningBadge,
};
