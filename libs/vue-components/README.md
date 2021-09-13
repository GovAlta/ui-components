# vue-components

This library contains vue components from the Government of Alberta.

## Installation

> npm install @abgov/vue-components

## Documentation

Documentation is being worked on and will be provided soon.

## Usage

```
<template>
  <div id="app">
    <goa-header serviceName="Sample usage example" serviceHome="/" />
  </div>
</template>

<script>
import { GoAHeader } from '@abgov/vue-components';

export default {
  name: "App",
  components: {
    'goa-header': GoAHeader
  }
};
</script>
```

```
<template>
  <div id="app">
    <goa-card
      title="Energy Diversification Act"
      description="We are encouraging companies to turn out oil ",
      titleUrl="http://www.google.ca",
      cardWidth="auto",
      cardImageUrl="working-in-cold-hero-3_rdax_75.jpg"
    />
  </div>
</template>

<script>
  import { GoACard } from '@abgov/vue-components';

  export default {
    name: 'App',
    components: {
      'goa-card': GoACard,
    },
  };
</script>
```

```
<template>
  <div id="app">
  <goa-card-group
     title= 'Card gourp Title'
      Layout= 'basic'>
    <goa-card
      title="Energy Diversification Act"
      description="We are encouraging companies.",
      titleUrl="http://www.google.ca",
      cardWidth="auto",
      cardImageUrl="working-in-cold-hero-3_rdax_75.jpg"
    />

   </goa-card-group>
  </div>
</template>

<script>
  import { GoACardGroup } from '@abgov/vue-components';

  export default {
    name: 'App',
    components: {
      'goa-card': GoACardGroup,
    },
  };
</script>
```

```
<template>
  <div id="app">
    <goa-callout title="CalloutTitle" content="CalloutContent" calloutType="information"/>
  </div>
</template>

<script>
import { GoACallout } from '@abgov/vue-components';

export default {
  name: "App",
  components: {
    'goa-callout': GoACallout
  }
};
</script>
```

```
<template>
  <div id="app">
    <goa-hero-banner
    title="Upgrading our bitumen" content="Information to the user goes in the content"
    backgroundUrl="working-in-cold-hero-3_rdax_75.jpg"
    linkText= 'Learn more',
      linkUrl= 'http://www.google.com',

    />
  </div>
</template>

<script>
import { GoAHeroBanner } from '@abgov/vue-components';

export default {
  name: "App",
  components: {
    'goa-hero-banner': GoAHeroBanner
  }
};
</script>
```

```
<template>
  <div id="app">
    <goa-notification-banner
      type="'important' || 'information' || 'event' || 'emergency'"
      title="Notification Title"
      message="Information to the user goes in the message"
      isDismissable="true"
      notificationUrl="www.google.com"
      title="Hidden Title"
    />
  </div>
</template>

<script>
import { GoANotification } from '@abgov/vue-components';

export default {
  name: "App",
  components: {
    'goa-notification-banner': GoANotification
  }
};
</script>

```

```
<template>
  <div id="app">
    <goa-button
      buttonType="'primary || 'secondary' || 'tertiary'"
      buttonSize="'small' || 'normal'"
      title="Hovering over"
      v-on:click="() => function()"
    >
    <goa-element-loader
      visible= true|false
      size= 'default'|'small'
      baseColour= '#0070c4'
      spinnerColour= '#c8eef9'
    />
    </goa-button>
  </div>
</template>

<script>
import { GoAButton } from '@abgov/vue-components';

export default {
  name: "App",
  components: {
    'goa-element-loader': GoAElementLoader
  }
};
</script>
```
