<svelte:options customElement="goa-icon" />

<script lang="ts" context="module">
  export type IconSize =
    | "1"
    | "2"
    | "3"
    | "4"
    | "5"
    | "6"
    | "2xsmall"
    | "xsmall"
    | "small"
    | "medium"
    | "large"
    | "xlarge";
  export type IconVariant = "primary" | "secondary" | "tertiary";
  export type IconTheme = "outline" | "filled";

  export type GoAIconType =
    | "accessibility"
    | "add-circle"
    | "add"
    | "airplane"
    | "alarm"
    | "albums"
    | "alert-circle"
    | "alert"
    | "american-football"
    | "analytics"
    | "aperture"
    | "apps"
    | "archive"
    | "arrow-back-circle"
    | "arrow-back"
    | "arrow-down-circle"
    | "arrow-down"
    | "arrow-forward-circle"
    | "arrow-forward"
    | "arrow-redo-circle"
    | "arrow-redo"
    | "arrow-undo-circle"
    | "arrow-undo"
    | "arrow-up-circle"
    | "arrow-up"
    | "at-circle"
    | "at"
    | "attach"
    | "backspace"
    | "bag-add"
    | "bag-check"
    | "bag-handle"
    | "bag"
    | "bag-remove"
    | "balloon"
    | "ban"
    | "bandage"
    | "bar-chart"
    | "barbell"
    | "barcode"
    | "baseball"
    | "basket"
    | "basketball"
    | "battery-charging"
    | "battery-dead"
    | "battery-full"
    | "battery-half"
    | "beaker"
    | "bed"
    | "beer"
    | "bicycle"
    | "bluetooth"
    | "boat"
    | "body"
    | "bonfire"
    | "book"
    | "bookmark"
    | "bookmarks"
    | "bowling-ball"
    | "briefcase"
    | "browsers"
    | "brush"
    | "bug"
    | "build"
    | "bulb"
    | "bus"
    | "business"
    | "cafe"
    | "calculator"
    | "calendar-clear"
    | "calendar-number"
    | "calendar"
    | "call"
    | "camera"
    | "camera-reverse"
    | "car"
    | "car-sport"
    | "card"
    | "caret-back-circle"
    | "caret-back"
    | "caret-down-circle"
    | "caret-down"
    | "caret-forward-circle"
    | "caret-forward"
    | "caret-up-circle"
    | "caret-up"
    | "cart"
    | "cash"
    | "cellular"
    | "chatbox-ellipses"
    | "chatbox"
    | "chatbubble-ellipses"
    | "chatbubble"
    | "chatbubbles"
    | "checkbox"
    | "checkmark-circle"
    | "checkmark-done-circle"
    | "checkmark-done"
    | "chevron-back-circle"
    | "chevron-back"
    | "chevron-down-circle"
    | "chevron-down"
    | "chevron-forward-circle"
    | "chevron-forward"
    | "chevron-up-circle"
    | "chevron-up"
    | "clipboard"
    | "close-circle"
    | "close"
    | "cloud-circle"
    | "cloud-done"
    | "cloud-download"
    | "cloud-offline"
    | "cloud"
    | "cloud-upload"
    | "cloudy-night"
    | "cloudy"
    | "code-download"
    | "code"
    | "code-slash"
    | "code-working"
    | "cog"
    | "color-fill"
    | "color-filter"
    | "color-palette"
    | "color-wand"
    | "compass"
    | "construct"
    | "contract"
    | "contrast"
    | "copy"
    | "create"
    | "crop"
    | "cube"
    | "cut"
    | "desktop"
    | "diamond"
    | "dice"
    | "disc"
    | "document-attach"
    | "document-lock"
    | "document"
    | "document-text"
    | "documents"
    | "download"
    | "duplicate"
    | "ear"
    | "earth"
    | "easel"
    | "egg"
    | "ellipse"
    | "ellipsis-horizontal-circle"
    | "ellipsis-horizontal"
    | "ellipsis-vertical-circle"
    | "ellipsis-vertical"
    | "enter"
    | "exit"
    | "expand"
    | "extension-puzzle"
    | "eye-off"
    | "eye"
    | "eyedrop"
    | "fast-food"
    | "female"
    | "file-tray-full"
    | "file-tray"
    | "file-tray-stacked"
    | "filenames.ps1"
    | "film"
    | "filter-circle"
    | "filter"
    | "finger-print"
    | "fish"
    | "fitness"
    | "flag"
    | "flame"
    | "flash-off"
    | "flash"
    | "flashlight"
    | "flask"
    | "flower"
    | "folder-open"
    | "folder"
    | "football"
    | "footsteps"
    | "funnel"
    | "game-controller"
    | "gift"
    | "git-branch"
    | "git-commit"
    | "git-compare"
    | "git-merge"
    | "git-network"
    | "git-pull-request"
    | "glasses"
    | "globe"
    | "golf"
    | "grid"
    | "hammer"
    | "hand-left"
    | "hand-right"
    | "happy"
    | "hardware-chip"
    | "headset"
    | "heart-circle"
    | "heart-dislike-circle"
    | "heart-dislike"
    | "heart-half"
    | "heart"
    | "help-buoy"
    | "help-circle"
    | "help"
    | "home"
    | "hourglass"
    | "ice-cream"
    | "id-card"
    | "image"
    | "images"
    | "infinite"
    | "information-circle"
    | "information"
    | "invert-mode"
    | "journal"
    | "key"
    | "keypad"
    | "language"
    | "laptop"
    | "layers"
    | "leaf"
    | "library"
    | "link"
    | "list-circle"
    | "list"
    | "locate"
    | "location"
    | "lock-closed"
    | "lock-open"
    | "log-in"
    | "log-out"
    | "magnet"
    | "mail-open"
    | "mail"
    | "mail-unread"
    | "male-female"
    | "male"
    | "man"
    | "map"
    | "medal"
    | "medical"
    | "medkit"
    | "megaphone"
    | "menu"
    | "mic-circle"
    | "mic-off-circle"
    | "mic-off"
    | "mic"
    | "moon"
    | "move"
    | "musical-note"
    | "musical-notes"
    | "navigate-circle"
    | "navigate"
    | "newspaper"
    | "notifications-circle"
    | "notifications-off-circle"
    | "notifications-off"
    | "notifications"
    | "nuclear"
    | "nutrition"
    | "open"
    | "options"
    | "paper-plane"
    | "partly-sunny"
    | "pause-circle"
    | "pause"
    | "paw"
    | "people-circle"
    | "people"
    | "person-add"
    | "person-circle"
    | "person"
    | "person-remove"
    | "phone-landscape"
    | "phone-portrait"
    | "pie-chart"
    | "pin"
    | "pint"
    | "pizza"
    | "planet"
    | "play-back-circle"
    | "play-back"
    | "play-circle"
    | "play-forward-circle"
    | "play-forward"
    | "play"
    | "play-skip-back-circle"
    | "play-skip-back"
    | "play-skip-forward-circle"
    | "play-skip-forward"
    | "podium"
    | "power"
    | "pricetag"
    | "pricetags"
    | "print"
    | "prism"
    | "pulse"
    | "push"
    | "qr-code"
    | "radio-button-off"
    | "radio-button-on"
    | "radio"
    | "rainy"
    | "reader"
    | "receipt"
    | "recording"
    | "refresh-circle"
    | "refresh"
    | "reload-circle"
    | "reload"
    | "remove-circle"
    | "reorder-four"
    | "reorder-three"
    | "reorder-two"
    | "repeat"
    | "resize"
    | "restaurant"
    | "return-down-back"
    | "return-down-forward"
    | "return-up-back"
    | "return-up-forward"
    | "ribbon"
    | "rocket"
    | "rose"
    | "sad"
    | "save"
    | "scale"
    | "scan-circle"
    | "scan"
    | "school"
    | "search-circle"
    | "search"
    | "send"
    | "server"
    | "settings"
    | "shapes"
    | "share"
    | "share-social"
    | "shield-checkmark"
    | "shield-half"
    | "shield"
    | "shirt"
    | "shuffle"
    | "skull"
    | "snow"
    | "sparkles"
    | "speedometer"
    | "square"
    | "star-half"
    | "star"
    | "stats-chart"
    | "stop-circle"
    | "stop"
    | "stopwatch"
    | "storefront"
    | "subway"
    | "sunny"
    | "swap-horizontal"
    | "swap-vertical"
    | "sync-circle"
    | "sync"
    | "tablet-landscape"
    | "tablet-portrait"
    | "telescope"
    | "tennisball"
    | "terminal"
    | "text"
    | "thermometer"
    | "thumbs-down"
    | "thumbs-up"
    | "thunderstorm"
    | "ticket"
    | "time"
    | "timer"
    | "today"
    | "toggle"
    | "trail-sign"
    | "train"
    | "transgender"
    | "trash-bin"
    | "trash"
    | "trending-down"
    | "trending-up"
    | "triangle"
    | "trophy"
    | "tv"
    | "umbrella"
    | "unlink"
    | "videocam-off"
    | "videocam"
    | "volume-high"
    | "volume-low"
    | "volume-medium"
    | "volume-mute"
    | "volume-off"
    | "walk"
    | "wallet"
    | "warning"
    | "watch"
    | "water"
    | "wifi"
    | "wine"
    | "woman"
    | "logo-alipay"
    | "logo-amazon"
    | "logo-amplify"
    | "logo-android"
    | "logo-angular"
    | "logo-apple"
    | "logo-apple-appstore"
    | "logo-apple-ar"
    | "logo-behance"
    | "logo-bitbucket"
    | "logo-bitcoin"
    | "logo-buffer"
    | "logo-capacitor"
    | "logo-chrome"
    | "logo-closed-captioning"
    | "logo-codepen"
    | "logo-css3"
    | "logo-designernews"
    | "logo-deviantart"
    | "logo-discord"
    | "logo-docker"
    | "logo-dribbble"
    | "logo-dropbox"
    | "logo-edge"
    | "logo-electron"
    | "logo-euro"
    | "logo-facebook"
    | "logo-figma"
    | "logo-firebase"
    | "logo-firefox"
    | "logo-flickr"
    | "logo-foursquare"
    | "logo-github"
    | "logo-gitlab"
    | "logo-google"
    | "logo-google-playstore"
    | "logo-hackernews"
    | "logo-html5"
    | "logo-instagram"
    | "logo-ionic"
    | "logo-ionitron"
    | "logo-javascript"
    | "logo-laravel"
    | "logo-linkedin"
    | "logo-markdown"
    | "logo-mastodon"
    | "logo-medium"
    | "logo-microsoft"
    | "logo-no-smoking"
    | "logo-nodejs"
    | "logo-npm"
    | "logo-octocat"
    | "logo-paypal"
    | "logo-pinterest"
    | "logo-playstation"
    | "logo-pwa"
    | "logo-python"
    | "logo-react"
    | "logo-reddit"
    | "logo-rss"
    | "logo-sass"
    | "logo-skype"
    | "logo-slack"
    | "logo-snapchat"
    | "logo-soundcloud"
    | "logo-stackoverflow"
    | "logo-steam"
    | "logo-stencil"
    | "logo-tableau"
    | "logo-tiktok"
    | "logo-tumblr"
    | "logo-tux"
    | "logo-twitch"
    | "logo-twitter"
    | "logo-usd"
    | "logo-venmo"
    | "logo-vercel"
    | "logo-vimeo"
    | "logo-vk"
    | "logo-vue"
    | "logo-web-component"
    | "logo-wechat"
    | "logo-whatsapp"
    | "logo-windows"
    | "logo-wordpress"
    | "logo-xbox"
    | "logo-xing"
    | "logo-yahoo"
    | "logo-yen"
    | "logo-youtube";

  type GoAIconOverridesType =
    | "pencil"
    | "checkmark"
    | "remove"
    | "goa-file"
    | "goa-text"
    | "goa-pdf"
    | "goa-doc"
    | "goa-ppt"
    | "goa-xls"
    | "goa-zip"
    | "goa-video"
    | "goa-audio"
    | "goa-image";

  type GoAIconOverridesTypeWithTheme = "pencil-filled";
</script>

<script lang="ts">
  import type { Spacing } from "../../common/styling";
  import { style, toBoolean } from "../../common/utils";
  import { calculateMargin } from "../../common/styling";

  export let mt: Spacing = null;
  export let mr: Spacing = null;
  export let mb: Spacing = null;
  export let ml: Spacing = null;

  // Required

  export let type: GoAIconType & GoAIconOverridesType;

  // Optional

  export let size: IconSize = "medium";
  export let theme: IconTheme = "outline";
  export let inverted: string = "false";
  export let fillcolor: string = "";
  export let opacity: number = 1;
  export let title: string = "";
  export let testid: string = "";
  export let arialabel: string = "";
  export let ariacontrols: string = "";
  export let ariaexpanded: string = "";
  export let role: string = "img";

  // Reactive

  $: _isInverted = toBoolean(inverted);
  $: _ariaExpanded = toBoolean(ariaexpanded);
  $: _iconName = iconName(type, theme);
  // Private

  const _iconOverrides: Record<
    GoAIconOverridesType & GoAIconOverridesTypeWithTheme,
    string
  > = {
    pencil: `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M4.86885 18.6573C4.86885 18.9334 5.0927 19.1573 5.36885 19.1573H5.90136C6.03391 19.1573 6.16103 19.1046 6.25479 19.0109L15.6988 9.57357L14.4593 8.33405L5.01542 17.7713C4.92157 17.865 4.86885 17.9923 4.86885 18.1249V18.6573ZM19.1614 8.47035L15.5555 4.86447L16.7387 3.68129C17.058 3.36202 17.4571 3.20708 17.936 3.21647C18.4149 3.22586 18.814 3.39019 19.1333 3.70946L20.3446 4.92081C20.6639 5.24008 20.8235 5.63447 20.8235 6.10399C20.8235 6.5735 20.6639 6.9679 20.3446 7.28717L19.1614 8.47035ZM4.02372 20.8475C3.77957 20.8475 3.57768 20.7677 3.41804 20.608C3.25841 20.4484 3.17859 20.2465 3.17859 20.0024V17.5797C3.17859 17.467 3.19737 17.3637 3.23493 17.2698C3.27249 17.1759 3.33822 17.082 3.43213 16.9881L14.4874 5.93952L18.0933 9.5454L7.03801 20.594C6.9441 20.6879 6.8502 20.7536 6.7563 20.7912C6.6624 20.8287 6.5591 20.8475 6.44642 20.8475H4.02372Z" fill="currentcolor"/> </svg>`,
    "pencil-filled": `<svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M19.1442 8.47956L15.5355 4.87088L16.7196 3.68678C17.0391 3.36726 17.4385 3.2122 17.9178 3.22159C18.3971 3.23099 18.7965 3.39545 19.116 3.71497L20.3283 4.92726C20.6478 5.24678 20.8076 5.64148 20.8076 6.11136C20.8076 6.58124 20.6478 6.97594 20.3283 7.29546L19.1442 8.47956ZM4.03951 20.8424C3.79517 20.8424 3.59312 20.7626 3.43337 20.6028C3.27361 20.443 3.19373 20.241 3.19373 19.9966V17.5721C3.19373 17.4593 3.21252 17.356 3.25011 17.262C3.2877 17.168 3.35349 17.074 3.44746 16.9801L14.4689 5.93435L18.0776 9.54303L7.05615 20.5887C6.96217 20.6827 6.8682 20.7485 6.77422 20.7861C6.68024 20.8236 6.57687 20.8424 6.4641 20.8424H4.03951Z" fill="currentcolor" /> </svg>`,
    checkmark: `<svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg"> <path fill-rule="evenodd" clip-rule="evenodd" d="M6.20129 11.5368L15.9974 0.341265C16.3611 -0.0743717 16.9929 -0.116489 17.4085 0.247193C17.8241 0.610875 17.8663 1.24264 17.5026 1.65827L7.00258 13.6583C6.82032 13.8666 6.5599 13.99 6.28328 13.9992C6.00666 14.0084 5.7386 13.9026 5.54289 13.7069L1.04289 9.20688C0.652369 8.81635 0.652369 8.18319 1.04289 7.79266C1.43342 7.40214 2.06658 7.40214 2.45711 7.79266L6.20129 11.5368Z" fill="currentcolor"/> </svg>`,
    remove: `<svg width="16" height="20" viewBox="0 0 16 1" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M1.5 -0.000244141C0.947715 -0.000244141 0.5 0.447471 0.5 0.999756C0.5 1.55204 0.947715 1.99976 1.5 1.99976H15C15.5523 1.99976 16 1.55204 16 0.999756C16 0.447471 15.5523 -0.000244141 15 -0.000244141H1.5Z" fill="currentcolor"/> </svg>`,
    "goa-file": `<svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_1357_108691)"> <path d="M38.741 14C38.541 13.07 38.081 12.22 37.401 11.54L36.861 11L27.861 2L27.321 1.46C26.641 0.78 25.781 0.32 24.861 0.12C24.511 0.04 24.151 0 23.791 0H5.86096C3.10096 0 0.860962 2.24 0.860962 5V43C0.860962 45.76 3.10096 48 5.86096 48H33.861C36.621 48 38.861 45.76 38.861 43V15.07C38.861 14.71 38.811 14.35 38.741 14ZM35.041 12H29.871C28.221 12 26.871 10.65 26.871 9V3.83L35.041 12ZM36.871 43C36.871 44.65 35.521 46 33.871 46H5.87097C4.22097 46 2.87097 44.65 2.87097 43V5C2.87097 3.35 4.22097 2 5.87097 2H23.801C24.171 2 24.531 2.07 24.871 2.2V9C24.871 11.76 27.111 14 29.871 14H36.671C36.801 14.34 36.871 14.7 36.871 15.07V43Z" fill="currentcolor"/> </g> <defs> <clipPath id="clip0_1357_108691"><rect width="38" height="48" fill="white" transform="translate(0.861328)"/></clipPath></defs></svg>`,
    "goa-text": `<svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M38.7953 14C38.5953 13.07 38.1353 12.22 37.4553 11.54L36.9153 11L27.9153 2L27.3753 1.46C26.6953 0.78 25.8353 0.32 24.9153 0.12C24.5653 0.04 24.2053 0 23.8453 0H5.91528C3.15528 0 0.915283 2.24 0.915283 5V43C0.915283 45.76 3.15528 48 5.91528 48H33.9153C36.6753 48 38.9153 45.76 38.9153 43V15.07C38.9153 14.71 38.8653 14.35 38.7953 14ZM35.0953 12H29.9253C28.2753 12 26.9253 10.65 26.9253 9V3.83L35.0953 12ZM36.9253 43C36.9253 44.65 35.5753 46 33.9253 46H5.91528C4.26528 46 2.91528 44.65 2.91528 43V5C2.91528 3.35 4.26528 2 5.91528 2H23.8453C24.2153 2 24.5753 2.07 24.9153 2.2V9C24.9153 11.76 27.1553 14 29.9153 14H36.7153C36.8453 14.34 36.9153 14.7 36.9153 15.07V43H36.9253Z" fill="currentcolor"/> <path d="M27.9153 34H11.9153C11.363 34 10.9153 34.4477 10.9153 35C10.9153 35.5523 11.363 36 11.9153 36H27.9153C28.4676 36 28.9153 35.5523 28.9153 35C28.9153 34.4477 28.4676 34 27.9153 34Z" fill="currentcolor"/> <path d="M27.9153 26H11.9153C11.363 26 10.9153 26.4477 10.9153 27C10.9153 27.5523 11.363 28 11.9153 28H27.9153C28.4676 28 28.9153 27.5523 28.9153 27C28.9153 26.4477 28.4676 26 27.9153 26Z" fill="currentcolor"/> </svg>`,
    "goa-pdf": `<svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M37.8861 14C37.6861 13.07 37.2261 12.22 36.5461 11.54L36.0061 11L27.0061 2L26.4661 1.46C25.7861 0.78 24.9261 0.32 24.0061 0.12C23.6561 0.04 23.2961 0 22.9361 0H5.0061C2.2461 0 0.00610352 2.24 0.00610352 5V43C0.00610352 45.76 2.2461 48 5.0061 48H33.0061C35.7661 48 38.0061 45.76 38.0061 43V15.07C38.0061 14.71 37.9561 14.35 37.8861 14ZM34.1861 12H29.0161C27.3661 12 26.0161 10.65 26.0161 9V3.83L34.1861 12ZM36.0161 43C36.0161 44.65 34.6661 46 33.0161 46H5.0061C3.3561 46 2.0061 44.65 2.0061 43V5C2.0061 3.35 3.3561 2 5.0061 2H22.9361C23.3061 2 23.6661 2.07 24.0061 2.2V9C24.0061 11.76 26.2461 14 29.0061 14H35.8061C35.9361 14.34 36.0061 14.7 36.0061 15.07V43H36.0161Z" fill="currentcolor"/> <path d="M5.02611 27C5.02611 26.45 5.47611 26 6.02611 26H9.05611C11.1161 26 12.9261 27.06 12.9261 29.28C12.9261 31.5 11.2461 32.74 8.85611 32.74H7.25611V35.85C7.25611 36.47 6.75611 36.97 6.13611 36.97C5.51611 36.97 5.01611 36.47 5.01611 35.85V27.01L5.02611 27ZM7.26611 30.96H8.73611C9.91611 30.96 10.6561 30.53 10.6561 29.31C10.6561 28.22 9.90611 27.77 8.79611 27.77H7.25611V30.96H7.26611Z" fill="currentcolor"/> <path d="M15.0361 27C15.0361 26.45 15.4861 26 16.0361 26H18.8461C22.1761 26 24.0161 28.03 24.0161 31.25C24.0161 34.82 22.0961 36.96 18.7661 36.96H16.0361C15.4861 36.96 15.0361 36.51 15.0361 35.96V27ZM17.2961 35.2H18.7361C20.6861 35.2 21.6961 33.74 21.6961 31.28C21.6961 29.25 20.7861 27.79 18.7461 27.79H17.2861V35.2H17.2961Z" fill="currentcolor"/> <path d="M25.9761 27C25.9761 26.45 26.4261 26 26.9761 26H32.0861C32.5961 26 33.0061 26.41 33.0061 26.92C33.0061 27.43 32.5961 27.84 32.0861 27.84H28.1761V30.63H31.8161C32.3161 30.63 32.7161 31.03 32.7161 31.53C32.7161 32.03 32.3161 32.43 31.8161 32.43H28.1761V35.86C28.1761 36.47 27.6861 36.96 27.0761 36.96C26.4661 36.96 25.9761 36.47 25.9761 35.86V26.99V27Z" fill="currentcolor"/> </svg> `,
    "goa-doc": `<svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M38.6134 14C38.4134 13.07 37.9534 12.22 37.2734 11.54L36.7334 11L27.7334 2L27.1934 1.46C26.5134 0.78 25.6534 0.32 24.7334 0.12C24.3834 0.04 24.0234 0 23.6634 0H5.7334C2.9734 0 0.733398 2.24 0.733398 5V43C0.733398 45.76 2.9734 48 5.7334 48H33.7334C36.4934 48 38.7334 45.76 38.7334 43V15.07C38.7334 14.71 38.6834 14.35 38.6134 14ZM34.9134 12H29.7434C28.0934 12 26.7434 10.65 26.7434 9V3.83L34.9134 12ZM36.7434 43C36.7434 44.65 35.3934 46 33.7434 46H5.7334C4.0834 46 2.7334 44.65 2.7334 43V5C2.7334 3.35 4.0834 2 5.7334 2H23.6634C24.0334 2 24.3934 2.07 24.7334 2.2V9C24.7334 11.76 26.9734 14 29.7334 14H36.5334C36.6634 14.34 36.7334 14.7 36.7334 15.07V43H36.7434Z" fill="currentcolor"/> <path d="M13.7834 36.6406L10.9034 24.5806C10.6934 23.7206 11.3534 22.8906 12.2334 22.8906C12.8734 22.8906 13.4334 23.3406 13.5734 23.9706C14.4934 28.2306 15.3434 32.5006 15.6434 34.9706H15.6634C16.0934 32.6806 17.3834 27.7106 18.2434 24.0806C18.4134 23.3806 19.0334 22.8906 19.7534 22.8906C20.4634 22.8906 21.0834 23.3706 21.2534 24.0606C22.0734 27.3606 23.3634 32.5806 23.7534 34.8406H23.7734C24.1834 32.0406 25.4534 26.8306 26.1134 23.8706C26.2434 23.3006 26.7434 22.8906 27.3334 22.8906C28.1534 22.8906 28.7434 23.6606 28.5434 24.4506L25.4134 36.6706C25.2134 37.4606 24.5034 38.0106 23.6934 38.0106C22.8634 38.0106 22.1534 37.4506 21.9634 36.6406C21.1734 33.2806 20.0434 28.8506 19.6434 26.6306H19.6234C19.1834 28.9106 18.0234 33.4506 17.2234 36.6606C17.0234 37.4506 16.3134 38.0006 15.5034 38.0006C14.6834 38.0006 13.9634 37.4406 13.7734 36.6406H13.7834Z" fill="currentcolor"/> </svg> `,
    "goa-ppt": `<svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M38.2498 14C38.0498 13.07 37.5898 12.22 36.9098 11.54L36.3698 11L27.3698 2L26.8298 1.46C26.1497 0.78 25.2898 0.32 24.3698 0.12C24.0198 0.04 23.6598 0 23.2998 0H5.36975C2.60975 0 0.369751 2.24 0.369751 5V43C0.369751 45.76 2.60975 48 5.36975 48H33.3698C36.1297 48 38.3698 45.76 38.3698 43V15.07C38.3698 14.71 38.3198 14.35 38.2498 14ZM34.5498 12H29.3798C27.7298 12 26.3798 10.65 26.3798 9V3.83L34.5498 12ZM36.3797 43C36.3797 44.65 35.0298 46 33.3797 46H5.36975C3.71975 46 2.36975 44.65 2.36975 43V5C2.36975 3.35 3.71975 2 5.36975 2H23.2998C23.6698 2 24.0298 2.07 24.3698 2.2V9C24.3698 11.76 26.6098 14 29.3698 14H36.1698C36.2998 14.34 36.3698 14.7 36.3698 15.07V43H36.3797Z" fill="currentcolor"/> <path d="M14.0798 24.8906C14.0798 23.7906 14.9798 22.8906 16.0798 22.8906H19.4698C22.3098 22.8906 24.6598 24.3406 24.6598 27.2906C24.6598 30.2406 22.4198 31.9306 19.2298 31.9306H16.7698V36.6606C16.7698 37.4006 16.1698 38.0006 15.4298 38.0006C14.6898 38.0006 14.0898 37.4006 14.0898 36.6606V24.8906H14.0798ZM16.7598 29.8206H19.0698C20.8098 29.8206 21.9498 29.1806 21.9498 27.3606C21.9498 25.7306 20.7798 25.0306 19.1298 25.0306H16.7498V29.8306L16.7598 29.8206Z" fill="currentcolor"/> </svg> `,
    "goa-xls": `<svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M38.3407 14C38.1407 13.07 37.6807 12.22 37.0007 11.54L36.4607 11L27.4607 2L26.9207 1.46C26.2407 0.78 25.3807 0.32 24.4607 0.12C24.1107 0.04 23.7507 0 23.3907 0H5.46069C2.70069 0 0.460693 2.24 0.460693 5V43C0.460693 45.76 2.70069 48 5.46069 48H33.4607C36.2207 48 38.4607 45.76 38.4607 43V15.07C38.4607 14.71 38.4107 14.35 38.3407 14ZM34.6407 12H29.4707C27.8207 12 26.4707 10.65 26.4707 9V3.83L34.6407 12ZM36.4707 43C36.4707 44.65 35.1207 46 33.4707 46H5.46069C3.81069 46 2.46069 44.65 2.46069 43V5C2.46069 3.35 3.81069 2 5.46069 2H23.3907C23.7607 2 24.1207 2.07 24.4607 2.2V9C24.4607 11.76 26.7007 14 29.4607 14H36.2607C36.3907 14.34 36.4607 14.7 36.4607 15.07V43H36.4707Z" fill="currentcolor"/> <path d="M23.4107 38.0006C22.9407 38.0006 22.5107 37.7506 22.2707 37.3406L19.3907 32.2806H19.3707L16.4607 37.3906C16.2507 37.7706 15.8407 38.0006 15.4107 38.0006C14.4707 38.0006 13.8907 36.9706 14.3807 36.1606L17.9207 30.3906L14.5807 24.8606C14.0607 23.9906 14.6807 22.8906 15.6907 22.8906C16.1607 22.8906 16.5907 23.1406 16.8207 23.5406L19.5307 28.2806L19.5507 28.2606L22.3507 23.4806C22.5607 23.1206 22.9507 22.8906 23.3807 22.8906C24.3107 22.8906 24.8807 23.9106 24.3907 24.7006L21.0307 30.1206L24.5407 36.0206C25.0607 36.8906 24.4307 38.0006 23.4207 38.0006H23.4107Z" fill="currentcolor"/> </svg> `,
    "goa-zip": `<svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M38.7043 14C38.5043 13.07 38.0443 12.22 37.3643 11.54L36.8243 11L27.8243 2L27.2843 1.46C26.6043 0.78 25.7443 0.32 24.8243 0.12C24.4743 0.04 24.1143 0 23.7543 0H5.82434C3.06434 0 0.824341 2.24 0.824341 5V43C0.824341 45.76 3.06434 48 5.82434 48H33.8243C36.5843 48 38.8243 45.76 38.8243 43V15.07C38.8243 14.71 38.7743 14.35 38.7043 14ZM35.0043 12H29.8343C28.1843 12 26.8343 10.65 26.8343 9V3.83L35.0043 12ZM36.8343 43C36.8343 44.65 35.4843 46 33.8343 46H5.82434C4.17434 46 2.82434 44.65 2.82434 43V5C2.82434 3.35 4.17434 2 5.82434 2H23.7543C24.1243 2 24.4843 2.07 24.8243 2.2V9C24.8243 11.76 27.0643 14 29.8243 14H36.6243C36.7543 14.34 36.8243 14.7 36.8243 15.07V43H36.8343Z" fill="currentcolor"/> <path d="M14.8243 20H12.8243V22H14.8243V20Z" fill="currentcolor"/> <path d="M12.8243 18H10.8243V20H12.8243V18Z" fill="currentcolor"/> <path d="M14.8243 16H12.8243V18H14.8243V16Z" fill="currentcolor"/> <path d="M12.8243 14H10.8243V16H12.8243V14Z" fill="currentcolor"/> <path d="M14.8243 12H12.8243V14H14.8243V12Z" fill="currentcolor"/> <path d="M12.8243 10H10.8243V12H12.8243V10Z" fill="currentcolor"/> <path d="M14.8243 8H12.8243V10H14.8243V8Z" fill="currentcolor"/> <path d="M12.8243 6H10.8243V8H12.8243V6Z" fill="currentcolor"/> <path d="M14.8243 4H12.8243V6H14.8243V4Z" fill="currentcolor"/> <path d="M12.8243 2H10.8243V4H12.8243V2Z" fill="currentcolor"/> <path d="M17.7244 32.14L15.4744 23.69C15.3644 23.29 15.0044 23 14.5844 23H11.0644C10.6444 23 10.2744 23.28 10.1744 23.69L7.92435 32.14C7.30435 35.17 9.62435 37.97 12.8244 38C16.0144 37.98 18.3444 35.18 17.7244 32.14ZM15.1944 34.89C14.6244 35.58 13.7644 35.98 12.8244 35.99C11.8844 35.98 11.0244 35.58 10.4544 34.89C9.92435 34.24 9.71435 33.42 9.87435 32.59L11.8944 25H13.7544L15.7744 32.59C15.9344 33.42 15.7244 34.24 15.1944 34.89Z" fill="currentcolor"/> <path d="M13.8243 32H11.8243C11.2721 32 10.8243 32.4477 10.8243 33C10.8243 33.5523 11.2721 34 11.8243 34H13.8243C14.3766 34 14.8243 33.5523 14.8243 33C14.8243 32.4477 14.3766 32 13.8243 32Z" fill="currentcolor"/> </svg> `,
    "goa-video": `<svg width="39" height="48" viewBox="0 0 39 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M37.977 14C37.777 13.07 37.317 12.22 36.637 11.54L36.097 11L27.097 2L26.557 1.46C25.877 0.78 25.017 0.32 24.097 0.12C23.747 0.04 23.387 0 23.027 0H5.09705C2.33705 0 0.0970459 2.24 0.0970459 5V43C0.0970459 45.76 2.33705 48 5.09705 48H33.097C35.857 48 38.097 45.76 38.097 43V15.07C38.097 14.71 38.047 14.35 37.977 14ZM34.277 12H29.107C27.457 12 26.107 10.65 26.107 9V3.83L34.277 12ZM36.107 43C36.107 44.65 34.757 46 33.107 46H5.09705C3.44705 46 2.09705 44.65 2.09705 43V5C2.09705 3.35 3.44705 2 5.09705 2H23.027C23.397 2 23.757 2.07 24.097 2.2V9C24.097 11.76 26.337 14 29.097 14H35.897C36.027 14.34 36.097 14.7 36.097 15.07V43H36.107Z" fill="currentcolor"/> <path d="M22.097 26.0002V29.0102C22.097 29.7802 22.927 30.2602 23.587 29.8802L25.077 29.0302L28.087 27.3202V34.6902L25.077 32.9802L23.587 32.1302C22.917 31.7502 22.097 32.2302 22.097 33.0002V35.9902H10.097V25.9902H22.097M22.097 23.9902H10.097C8.99705 23.9902 8.09705 24.8902 8.09705 25.9902V35.9902C8.09705 37.0902 8.99705 37.9902 10.097 37.9902H22.097C23.197 37.9902 24.097 37.0902 24.097 35.9902V34.7202L27.107 36.4302C27.427 36.6102 27.767 36.6902 28.087 36.6902C29.137 36.6902 30.087 35.8502 30.087 34.6902V27.3202C30.087 26.1502 29.127 25.3202 28.087 25.3202C27.757 25.3202 27.417 25.4002 27.107 25.5802L24.097 27.2902V25.9902C24.097 24.8902 23.197 23.9902 22.097 23.9902Z" fill="currentcolor"/> </svg> `,
    "goa-audio": `<svg width="39" height="49" viewBox="0 0 39 49" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M38.0679 14.2305C37.8679 13.3005 37.4079 12.4505 36.7279 11.7705L36.1879 11.2305L27.1879 2.23047L26.6479 1.69047C25.9679 1.01047 25.1079 0.550469 24.1879 0.350469C23.8379 0.270469 23.4779 0.230469 23.1179 0.230469H5.18793C2.42793 0.230469 0.187927 2.47047 0.187927 5.23047V43.2305C0.187927 45.9905 2.42793 48.2305 5.18793 48.2305H33.1879C35.9479 48.2305 38.1879 45.9905 38.1879 43.2305V15.3005C38.1879 14.9405 38.1379 14.5805 38.0679 14.2305ZM34.3679 12.2305H29.1979C27.5479 12.2305 26.1979 10.8805 26.1979 9.23047V4.06047L34.3679 12.2305ZM36.1979 43.2305C36.1979 44.8805 34.8479 46.2305 33.1979 46.2305H5.19792C3.54792 46.2305 2.19792 44.8805 2.19792 43.2305V5.23047C2.19792 3.58047 3.54792 2.23047 5.19792 2.23047H23.1279C23.4979 2.23047 23.8579 2.30047 24.1979 2.43047V9.23047C24.1979 11.9905 26.4379 14.2305 29.1979 14.2305H35.9979C36.1279 14.5705 36.1979 14.9305 36.1979 15.3005V43.2305Z" fill="currentcolor"/> <path d="M20.1879 25.1189V37.3489L16.3479 34.6089L15.8279 34.2389H10.1879V28.2389H15.8279L16.3479 27.8689L20.1879 25.1289M20.1879 23.1289C19.7979 23.1289 19.3979 23.2489 19.0279 23.5089L15.1879 26.2489H10.1879C9.08793 26.2489 8.18793 27.1489 8.18793 28.2489V34.2489C8.18793 35.3489 9.08793 36.2489 10.1879 36.2489H15.1879L19.0279 38.9889C19.3879 39.2489 19.7879 39.3689 20.1879 39.3689C21.2279 39.3689 22.1979 38.5489 22.1979 37.3689V25.1389C22.1979 23.9589 21.2279 23.1389 20.1879 23.1389V23.1289Z" fill="currentcolor"/> <path d="M26.1381 23.707C26.6381 24.037 27.1081 24.417 27.5481 24.857C27.9881 25.297 28.3681 25.767 28.6981 26.267C29.0281 26.767 29.2981 27.287 29.5181 27.837C29.7381 28.387 29.8981 28.937 30.0081 29.507C30.1181 30.077 30.1681 30.647 30.1681 31.227C30.1681 31.807 30.1181 32.377 30.0081 32.947C29.8981 33.517 29.7381 34.077 29.5181 34.617C29.2981 35.157 29.0281 35.687 28.6981 36.187C28.3681 36.687 27.9881 37.157 27.5481 37.597C27.1081 38.037 26.6381 38.417 26.1381 38.747" stroke="currentcolor" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/> </svg> `,
    "goa-image": `<svg width="39" height="49" viewBox="0 0 39 49" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M38.1588 14.2305C37.9588 13.3005 37.4988 12.4505 36.8188 11.7705L36.2788 11.2305L27.2788 2.23047L26.7388 1.69047C26.0588 1.01047 25.1988 0.550469 24.2788 0.350469C23.9288 0.270469 23.5688 0.230469 23.2088 0.230469H5.27881C2.51881 0.230469 0.278809 2.47047 0.278809 5.23047V43.2305C0.278809 45.9905 2.51881 48.2305 5.27881 48.2305H33.2788C36.0388 48.2305 38.2788 45.9905 38.2788 43.2305V15.3005C38.2788 14.9405 38.2288 14.5805 38.1588 14.2305ZM34.4588 12.2305H29.2888C27.6388 12.2305 26.2888 10.8805 26.2888 9.23047V4.06047L34.4588 12.2305ZM36.2888 43.2305C36.2888 44.8805 34.9388 46.2305 33.2888 46.2305H5.2888C3.6388 46.2305 2.2888 44.8805 2.2888 43.2305V5.23047C2.2888 3.58047 3.6388 2.23047 5.2888 2.23047H23.2188C23.5888 2.23047 23.9488 2.30047 24.2888 2.43047V9.23047C24.2888 11.9905 26.5288 14.2305 29.2888 14.2305H36.0888C36.2188 14.5705 36.2888 14.9305 36.2888 15.3005V43.2305Z" fill="currentcolor"/> <path d="M20.9985 28.2305C21.3585 28.2305 21.6485 28.4405 21.7885 28.7305L27.1085 36.7305C27.3185 37.0205 27.3185 37.4405 27.1785 37.7305C27.0385 38.0905 26.6785 38.2305 26.3185 38.2305H12.2385C11.8785 38.2305 11.5885 38.0905 11.3785 37.7305C11.2385 37.4405 11.2385 37.0205 11.4485 36.7305L14.8285 31.7305C14.9685 31.4405 15.3285 31.2305 15.6185 31.2305C15.9785 31.2305 16.2685 31.4405 16.4785 31.7305L17.3385 32.9405L20.1385 28.7305C20.3585 28.4405 20.6385 28.2305 20.9985 28.2305ZM20.9985 26.2305C20.0485 26.2305 19.1685 26.6905 18.5385 27.5305L18.4985 27.5805L18.4685 27.6305L17.1185 29.6605C16.6585 29.3805 16.1485 29.2405 15.6085 29.2405C14.6085 29.2405 13.6185 29.8205 13.1085 30.6905L9.79851 35.5905C9.17851 36.4505 9.08851 37.6705 9.57851 38.6305L9.60851 38.7005L9.6485 38.7705C10.2085 39.7005 11.1485 40.2405 12.2285 40.2405H26.3085C27.5185 40.2405 28.5385 39.6005 28.9985 38.5605C29.4385 37.6105 29.3385 36.4405 28.7485 35.6005L23.5085 27.7105C22.9885 26.8005 22.0485 26.2405 21.0085 26.2405L20.9985 26.2305Z" fill="currentcolor"/> <path d="M12.7788 23.2305C13.6088 23.2305 14.2788 23.9005 14.2788 24.7305C14.2788 25.5605 13.6088 26.2305 12.7788 26.2305C11.9488 26.2305 11.2788 25.5605 11.2788 24.7305C11.2788 23.9005 11.9488 23.2305 12.7788 23.2305ZM12.7788 21.2305C10.8488 21.2305 9.27881 22.8005 9.27881 24.7305C9.27881 26.6605 10.8488 28.2305 12.7788 28.2305C14.7088 28.2305 16.2788 26.6605 16.2788 24.7305C16.2788 22.8005 14.7088 21.2305 12.7788 21.2305Z" fill="currentcolor"/> </svg> `,
  } as const;


  function iconName(type: GoAIconType, theme: IconTheme): string {
    if (type) {
      const name =
        theme === "filled" || (type as string).indexOf("logo") === 0
          ? type
          : `${type}-${theme}`;
      return name;
    }
    return "";
  }
</script>

<div
  {role}
  aria-label={arialabel}
  aria-controls={ariacontrols}
  aria-expanded={_ariaExpanded}
  class={`goa-icon goa-icon--${size}`}
  class:inverted={_isInverted}
  data-testid={testid}
  {title}
  style={`
    ${calculateMargin(mt, mr, mb, ml)}
    ${style("--fill-color", fillcolor)};
    ${style("--opacity", opacity)};
  `}
>
  {#if type}
    {#if type in _iconOverrides}
      <div class="icon-override">
        {@html _iconOverrides[`${type}-${theme}`] || _iconOverrides[type]}
      </div>
    {:else}
      <ion-icon name={_iconName} />
    {/if}
  {/if}
</div>

<style>
  :host {
    display: inline-flex;
    align-items: center;
  }

  ion-icon {
    pointer-events: none;
    width: 100%;
    height: 100%;
  }

  .goa-icon {
    fill: var(--fill-color);
    color: var(--fill-color);
    opacity: var(--opacity);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  /* new icon sizes */
  .goa-icon--1 {
    width: var(--goa-icon-size-1);
    height: var(--goa-icon-size-1);
  }
  .goa-icon--2 {
    width: var(--goa-icon-size-2);
    height: var(--goa-icon-size-2);
  }
  .goa-icon--3 {
    width: var(--goa-icon-size-3);
    height: var(--goa-icon-size-3);
  }
  .goa-icon--4 {
    width: var(--goa-icon-size-4);
    height: var(--goa-icon-size-4);
  }
  .goa-icon--5 {
    width: var(--goa-icon-size-5);
    height: var(--goa-icon-size-5);
  }
  .goa-icon--6 {
    width: var(--goa-icon-size-6);
    height: var(--goa-icon-size-6);
  }

  /* old icon sizes (deprecate eventually - misaligned with tokens) */
  .goa-icon--2xsmall {
    width: var(--goa-icon-size-s);
    height: var(--goa-icon-size-s);
  }
  .goa-icon--xsmall {
    width: 18px;
    height: 18px;
  }
  .goa-icon--small {
    width: var(--goa-icon-size-m);
    height: var(--goa-icon-size-m);
  }
  .goa-icon--medium {
    width: var(--goa-icon-size-l);
    height: var(--goa-icon-size-l);
  }
  .goa-icon--large {
    width: 2rem;
    height: 2rem;
  }
  .goa-icon--xlarge {
    width: 2.5rem;
    height: 2.5rem;
  }

  /* override height when a custom svg icon is used to ensure svg retains dims */
  .goa-icon:has(.icon-override) {
    height: fit-content;
  }
  .icon-override {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* inverted */
  .inverted * {
    color: var(--goa-color-greyscale-white);
    fill: var(--goa-color-greyscale-white);
  }
</style>
