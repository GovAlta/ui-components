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
    <table width="100%">
      <thead>
        <tr>
          <th>Status</th>
          <th>Name</th>
          <th style="text-align: right">Id Number</th>
          <th style="width: 1%; white-space: nowrap">Edit | Flag | Send</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><goa-badge version="2" type="information" content="In progress" icon="false"></goa-badge></td>
          <td>Darlene Robertson</td>
          <td class="goa-table-number-column">45904</td>
          <td>
            <goa-block>
              <goa-icon-button size="small" icon="pencil" arialabel="Edit"></goa-icon-button>
              <goa-icon-button size="small" icon="flag" arialabel="Flag"></goa-icon-button>
              <goa-icon-button size="small" icon="mail" arialabel="Send"></goa-icon-button>
            </goa-block>
          </td>
        </tr>
        <tr>
          <td><goa-badge version="2" type="default" content="Inactive" icon="false"></goa-badge></td>
          <td>Floyd Miles</td>
          <td class="goa-table-number-column">47838</td>
          <td>
            <goa-block>
              <goa-icon-button size="small" icon="pencil" arialabel="Edit"></goa-icon-button>
              <goa-icon-button size="small" icon="flag" arialabel="Flag"></goa-icon-button>
              <goa-icon-button size="small" icon="mail" arialabel="Send"></goa-icon-button>
            </goa-block>
          </td>
        </tr>
        <tr>
          <td><goa-badge version="2" type="success" content="Active" icon="false"></goa-badge></td>
          <td>Kathryn Murphy</td>
          <td class="goa-table-number-column">34343</td>
          <td>
            <goa-block>
              <goa-icon-button size="small" icon="pencil" arialabel="Edit"></goa-icon-button>
              <goa-icon-button size="small" icon="flag" arialabel="Flag"></goa-icon-button>
              <goa-icon-button size="small" icon="mail" arialabel="Send"></goa-icon-button>
            </goa-block>
          </td>
        </tr>
        <tr>
          <td><goa-badge version="2" type="important" content="Recent" icon="false"></goa-badge></td>
          <td>Annette Black</td>
          <td class="goa-table-number-column">89897</td>
          <td>
            <goa-block>
              <goa-icon-button size="small" icon="pencil" arialabel="Edit"></goa-icon-button>
              <goa-icon-button size="small" icon="flag" arialabel="Flag"></goa-icon-button>
              <goa-icon-button size="small" icon="mail" arialabel="Send"></goa-icon-button>
            </goa-block>
          </td>
        </tr>
        <tr>
          <td><goa-badge version="2" type="success" content="Active" icon="false"></goa-badge></td>
          <td>Esther Howard</td>
          <td class="goa-table-number-column">12323</td>
          <td>
            <goa-block>
              <goa-icon-button size="small" icon="pencil" arialabel="Edit"></goa-icon-button>
              <goa-icon-button size="small" icon="flag" arialabel="Flag"></goa-icon-button>
              <goa-icon-button size="small" icon="mail" arialabel="Send"></goa-icon-button>
            </goa-block>
          </td>
        </tr>
        <tr>
          <td><goa-badge version="2" type="success" content="Active" icon="false"></goa-badge></td>
          <td>Jane Cooper</td>
          <td class="goa-table-number-column">56565</td>
          <td>
            <goa-block>
              <goa-icon-button size="small" icon="pencil" arialabel="Edit"></goa-icon-button>
              <goa-icon-button size="small" icon="flag" arialabel="Flag"></goa-icon-button>
              <goa-icon-button size="small" icon="mail" arialabel="Send"></goa-icon-button>
            </goa-block>
          </td>
        </tr>
      </tbody>
    </table>
  </goa-table>
</template>
