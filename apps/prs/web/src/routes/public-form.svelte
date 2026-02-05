<script lang="ts">
  import { onMount } from "svelte";
  import {
    RequiredValidator,
    LengthValidator,
    SINValidator,
    NumericValidator,
    type PFPage,
  } from "@abgov/ui-components-common";

  function toHumanDate(val: string) {
    const [y, m, d] = val.split("-");
    const months =
      "January February March April May June July August September October November December".split(
        " ",
      );
    const [year, month, day] = [
      y,
      parseInt(month.replace(/^0/g, "")),
      day.replace(/^0/g, ""),
    ];
    return `${months[month - 1]} ${day}, ${year}`;
  }

  let _state = undefined;

  const outline = {
    role: {
      props: {
        heading: "What is your role in the court order?",
        "section-title": "Support order details",
      },
      fields: {
        role: { label: "What is your role?", formatter: (val) => val.toUpperCase() },
      },
      next: (state: PFState) => {
        const role = state.dataBuffer["role"];
        return role === "Payor" ? "salary" : "children";
      },
      validators: {
        role: [RequiredValidator("Role is required")],
      },
    },

    children: {
      subform: true,
      props: {
        heading: "Do you have children",
      },
      fields: {
        "first-name": {
          label: "First name",
          formatter: (val) => val[0].toUpperCase() + val.substr(1),
        },
        "last-name": {
          label: "Last name",
          formatter: (val) => val[0].toUpperCase() + val.substr(1),
        },
        birthdate: { label: "Birthdate" },
      },
      next: "description",
      valdiators: {},
    },

    description: {
      props: {
        "section-title": "Support order details",
        heading: "Some description",
        "sub-heading": "Some subheading",
      },
      next: "foobar",
    },

    foobar: {
      props: {
        "section-title": "Support order details",
        heading: "Slotted checkbox test",
      },
      fields: {
        "fav-color": { label: "Favourite color?", hideInSummary: "always" },
        "fav-color-value": { label: "Color", hideInSummary: "ifBlank" },
        "fav-number-value": { label: "Number", hideInSummary: "ifBlank" },
      },
      next: "identification",
    },

    salary: {
      props: {
        heading: "Payor salary",
      },
      fields: {
        salary: { label: "Yearly income" },
      },
      next: "summary",
      validators: {
        salary: [NumericValidator({ min: 0 })],
      },
    },

    identification: {
      props: {
        "section-title": "Support order details",
        heading: "Do you know any of the identifiers about the other party?",
      },
      fields: {
        sin: {
          label: "Social Insurance #",
          formatter: (val: string) => val.match(/(.{3})/g)?.join(" "),
        },
        ahcn: {
          label: "Alberta Health Care #",
          formatter: (val: string) => val.match(/(.{4})/g)?.join("-"),
        },
        info: { label: "Additional information" },
      },
      next: (state): string => {
        const sin = state.dataBuffer["sin"];
        const ahcn = state.dataBuffer["ahcn"];

        if (!sin && !ahcn) {
          throw "Either sin or ahcn is required";
        }

        return "address";
      },
      validators: {
        sin: [SINValidator()],
        ahcn: [LengthValidator({ min: 8 })],
      },
    },

    payor: {
      props: {
        heading: "Payor Name",
      },
      fields: {
        firstName: { label: "First name" },
        lastName: { label: "Last name" },
      },
      summarize: (page: PFPage) => ({
        "Full name": `${page["firstName"]} ${page["lastName"]}`.trim(),
      }),
      next: "address",
    },

    address: {
      props: {
        "section-title": "Support order details",
        heading: "Your current address",
      },
      fields: {
        city: { label: "City/Town" },
        street: { label: "Street #" },
        "postal-code": { label: "Postal code" },
      },
      next: "summary",
    },

    summary: {
      props: {
        "section-title": "Support order details",
        heading: "Summary",
      },
      next: (state): string => {
        console.log("submit to backend here", state);
      },
    },
  };

  function init(e: CustomEvent) {
    const raw = `
      {
  "data": {
    "role": {
      "role": "Recipient"
    },
    "children": [
      {
        "first-name": "Colton",
        "last-name": "Cheung",
        "birthdate": "2012-03-01",
        "_id": "fe93e629-ab88-4a3b-a22f-e8a8e9b8eb22"
      },
      {
        "first-name": "Wesley",
        "last-name": "Olsen",
        "birthdate": "2019-08-04",
        "_id": "db51013a-4bea-406a-9878-b38accac72a9"
      }
    ],
    "description": {},
    "foobar": {
      "fav-color-radiogroup": "optional-1",
      "radio-reveal": "This is some optional field response",
      "radio-reveal-2": "",
      "fav-color-checkbox": "checked",
      "fav-color": "Red",
      "fav-colors": "I like red",
      "some-checkbox": "checked",
      "colors": "red",
      "fav-names": "",
      "birthdate": "2025-12-15"
    },
    "identification": {
      "sin": "",
      "ahcn": "121212121212",
      "info": "Some additional details"
    },
    "payor": {
      "firstName": "",
      "lastName": ""
    },
    "salary": {
      "salary": ""
    },
    "address": {
      "city": "Edmonton",
      "street": "3100-Somewhere Cres",
      "postal-code": "T3T3T3"
    },
    "summary": {}
  },
  "dataBuffer": {},
  "history": [
    "role",
    "children",
    "description",
    "foobar",
    "identification",
    "address",
    "summary"
  ]
}
    `;

    setTimeout(() => {
      const initData = JSON.parse(raw);
      const fn = e.detail;
      console.log("func", fn);
      _state = fn(null, { outline });
    }, 1000);
  }

  // Called on every keypress => realtime page updates
  function onChange(e) {
    // console.log("onChange", e.detail);
  }

  // After the continue button is clicked
  function onNext(e) {
    // Can push changes to backend here
    // _state = e.detail;
    // console.log("onNext", _state);
  }

  function getPage(state: PFState, id: string, defaultValue: unknown) {
    return state?.data?.[id] || defaultValue;
  }

  // TODO: maybe change this name..the "change" term may cause others to think that is
  // fired on each keypress, like simular to how the _change works
  function onSubformChange(e) {
    const state = (e as CustomEvent).detail;
    _state = { ...state };
  }
</script>

<div style="margin: 5rem auto; width: 90ch">
  <goa-public-form
    on:_init={init}
    on:_change={onChange}
    on:_subformChange={onSubformChange}
    on:_next={onNext}
  >
    <goa-public-form-page id="role">
      <goa-form-item helptext="some help text">
        <goa-radio-group name="role" data-pf-item>
          <goa-radio-item value="Recipient" label="Recipient"></goa-radio-item>
          <goa-radio-item value="Payor" label="Payor"></goa-radio-item>
        </goa-radio-group>
      </goa-form-item>
    </goa-public-form-page>

    <goa-public-form-page id="children" data-pf-list>
      <goa-pf-subform>
        <table>
          {#each getPage(_state, "children", []) as child (child._id)}
            <tr>
              <td>{child["first-name"]}</td>
              <td>{child["last-name"]}</td>
              <td><goa-link action="edit" action-arg={child._id}>Edit</goa-link> </td><td
                ><goa-link action="delete" action-arg={child._id}>Remove</goa-link>
              </td></tr
            >
          {/each}
        </table>

        <form slot="form">
          <goa-form-item label="First name">
            <goa-input name="first-name" data-pf-item />
          </goa-form-item>
          <goa-form-item label="Last name">
            <goa-input name="last-name" data-pf-item />
          </goa-form-item>
          <goa-form-item label="Birthdate" mb="3xl">
            <goa-date-picker type="input" name="birthdate" data-pf-item />
          </goa-form-item>
        </form>
      </goa-pf-subform>
    </goa-public-form-page>

    <goa-public-form-page id="description">
      This is a page that is read-only

      <goa-details heading="Some important detail">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, odit!
        Voluptatem dolor soluta aspernatur ipsa dolorem est iure vitae eaque ea, vero
        architecto praesentium, quia excepturi, odio porro? Fuga, officia?
      </goa-details>
    </goa-public-form-page>

    <goa-public-form-page id="foobar">
      <goa-radio-group data-pf-item name="fav-color">
        <goa-radio-item value="yes" label="Yes">
          <goa-input
            slot="reveal"
            name="fav-color-value"
            data-pf-item
            placeholder="What is it?"
          />
        </goa-radio-item>
        <goa-radio-item value="no fav color" label="No">
          <div slot="reveal">
            <goa-input
              name="fav-number-value"
              data-pf-item
              placeholder="What is your fav number then?"
            />
          </div>
        </goa-radio-item>
      </goa-radio-group>
    </goa-public-form-page>

    <goa-public-form-page id="identification">
      <goa-form-item
        label="What is the Social Insurance Number?"
        requirement="optional"
        helpText="9-digit number, such as 123 456 789."
      >
        <goa-input data-pf-item name="sin" />
      </goa-form-item>

      <goa-form-item label="What is the AHCN">
        <goa-input data-pf-item name="ahcn" />
      </goa-form-item>

      <goa-form-item label="Additional details">
        <goa-textarea data-pf-item name="info" />
      </goa-form-item>
    </goa-public-form-page>

    <goa-public-form-page id="payor">
      <goa-form-item label="First name">
        <goa-input data-pf-item name="firstName"></goa-input>
      </goa-form-item>
      <goa-form-item label="Last name">
        <goa-input data-pf-item name="lastName"></goa-input>
      </goa-form-item>
    </goa-public-form-page>

    <goa-public-form-page id="salary">
      <goa-form-item label="Salary">
        <goa-input data-pf-item name="salary" type="number"></goa-input>
      </goa-form-item>
    </goa-public-form-page>

    <goa-public-form-page id="address">
      <goa-form-item label="City" helptext="Where you live">
        <goa-input data-pf-item name="city"></goa-input>
      </goa-form-item>
      <goa-form-item label="Address">
        <goa-input data-pf-item name="street"></goa-input>
      </goa-form-item>
      <goa-form-item label="Postal Code">
        <goa-input data-pf-item name="postal-code"></goa-input>
      </goa-form-item>
    </goa-public-form-page>

    <goa-public-form-page id="summary" button-text="Submit" back-visibility="hidden">
      <goa-public-form-summary></goa-public-form-summary>
    </goa-public-form-page>
  </goa-public-form>
</div>
