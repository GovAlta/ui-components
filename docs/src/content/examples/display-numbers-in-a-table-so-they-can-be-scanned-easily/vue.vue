<!--
Prerequisites:
- npm install @abgov/web-components @abgov/design-tokens
- Vite: isCustomElement for goa-* tags (see setup docs)
- Import "@abgov/web-components" in main.ts
- Import CSS: @abgov/web-components/index.css + /design-tokens/dist/tokens.css
- Add ionicons CDN to index.html
- Full guide: get-started/developers/setup
-->

<template>
  <goa-table version="2" width="100%">
    <table style="width: 100%">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th class="goa-table-number-header">ID Number</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Sarah</td>
          <td>Johnson</td>
          <td class="goa-table-number-column">54</td>
        </tr>
        <tr>
          <td>Michael</td>
          <td>Chen</td>
          <td class="goa-table-number-column">4567</td>
        </tr>
        <tr>
          <td>Emily</td>
          <td>Williams</td>
          <td class="goa-table-number-column">892</td>
        </tr>
        <tr>
          <td>David</td>
          <td>Brown</td>
          <td class="goa-table-number-column">12345</td>
        </tr>
        <tr>
          <td>Jennifer</td>
          <td>Martinez</td>
          <td class="goa-table-number-column">7</td>
        </tr>
      </tbody>
    </table>
  </goa-table>
</template>
