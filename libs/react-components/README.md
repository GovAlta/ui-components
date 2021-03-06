# React UI Components

This library contains react components from the Government of Alberta.

Create react app
```bash
npm init vite@latest
```

Add Dependencies
```bash
npm i
npm i @abgov/react-components@3.4.0-alpha.7
npm i @abgov/styles
```

Link ionicons in app/index.html
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/src/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
    <!-- Ionicons -->
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script nomodule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
    <!-- -->
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>

```

```typescript
// App.tsx
import './App.css'

import { GoABadge } from '@abgov/react-components';

function App() {
  return (
    <GoABadge type="information" content="Some info" icon={true} />
  )
}

export default App


```

Import the styles in the `src/index.css` file
```css
@import '@abgov/styles/styles.esm.css';
```
