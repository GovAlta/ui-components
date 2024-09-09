import { CUSTOM_ELEMENTS_SCHEMA, Component } from "@angular/core";

import { faker } from "@faker-js/faker";
import { CommonModule } from "@angular/common";

import { GoabAccordion, GoabAppFooter, GoabAppFooterMetaSection, GoabAppFooterNavSection, GoabAppHeader, GoabAppHeaderMenu, GoabBadge, GoabBlock, GoabButton, GoabButtonGroup, GoabCallout, GoabCheckbox, GoabChip, GoabCircularProgress, GoabContainer, GoabDatePicker, GoabDetails, GoabDivider, GoabDropdown, GoabDropdownItem, GoabFileUploadCard, GoabFileUploadInput, GoabFormItem, GoabFormStep, GoabFormStepper, GoabHeroBanner, GoabIcon, GoabIconButton, GoabInput, GoabModal, GoabNotificationBanner, GoabPages, GoabPagination, GoabPopover, GoabRadioGroup, GoabRadioItem, GoabSideMenu, GoabSideMenuGroup, GoabSideMenuHeading, GoabSkeleton, GoabTab, GoabTable, GoabTabs, GoabTextArea, GoabTooltip } from "@abgov/angular-components";
import { GoabDropdownOnChangeDetail, GoabFormStepStatus, GoabFormStepperOnChangeDetail, GoabPaginationOnChangeDetail, GoabRadioGroupOnChangeDetail, GoabTextAreaOnChangeDetail } from "@abgov/ui-components-common";
import { FormControl } from "@angular/forms";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
}

@Component({
  standalone: true,
  selector: "goab-component-wrapper",
  template: `

    <goab-input [mb]="'s'" name="foo" />

    <h3>Block</h3>
    <goab-block gap="none">
      {{blockData}}
    </goab-block>
    <goab-button (onClick)="loadData()" >Load data</goab-button>

    <h3>TextArea</h3>


    <goab-textarea name="item" (onChange)="onTextAreaChange($event)"></goab-textarea>



    <goab-textarea name="sometext" [disabled]="true"></goab-textarea>

    <h3>Tabs</h3>
    <goab-tabs [initialTab]="2">
      <goab-tab>
        <div slot="heading">Heading 1 <b>slot</b></div>
        Tab Item 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </goab-tab>
      <goab-tab heading="Tab Item 2">
        Tab Item 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </goab-tab>
      <goab-tab heading="Tab Item 3">
        Tab Item 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </goab-tab>
    </goab-tabs>

    <h3>Table</h3>
    <goab-table width="100%" mb="xl" (_sort)="handleSort($event)">
      <thead>
        <tr>
          <th><goa-table-sort-header name="firstName">First name and really long header</goa-table-sort-header></th>
          <th><goa-table-sort-header name="lastName">Last name</goa-table-sort-header></th>
          <th><goa-table-sort-header name="age" direction="asc">Age</goa-table-sort-header></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of sortUsers; index as i">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.age }}</td>
        </tr>
      </tbody>
    </goab-table>

    <h3>Block</h3>
    <goa-block gap="none">
      <div>
        Item 1
      </div>
      <goa-spacer hSpacing="3xl"></goa-spacer>
      <div>
        Item 1
      </div>
      <goa-spacer></goa-spacer>
      <div>
        Item 1
      </div>
    </goa-block>

    <h3>Skeleton</h3>
    <goa-skeleton type="text"></goa-skeleton>

    <h3>Side Menu</h3>
    <div style="max-width: 250px">
      <goa-side-menu>
        <goa-side-menu-heading>
          Nav section 1
        </goa-side-menu-heading>
        <a href="#">Home</a>
        <a href="#">Profile</a>
        <goa-side-menu-heading icon="home">
          Nav section 2
        </goa-side-menu-heading>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <goa-side-menu-heading>
          Nav with sub nav
        </goa-side-menu-heading>
        <goa-side-menu-group heading="Group heading">
          <a href="#">Foo</a>
          <a href="#">Bar</a>
        </goa-side-menu-group>
      </goa-side-menu>
    </div>

    <h3>Radio Group</h3>
    <goab-radio-group name="item" value="1" (onChange)="onRadioChange($event)">
      <goab-radio-item value="1" label="Label">
        <div slot="description">Some details</div>
      </goab-radio-item>
      <goab-radio-item value="2" label="Label"></goab-radio-item>
      <goab-radio-item value="3" label="Label"></goab-radio-item>
    </goab-radio-group>

    <h3>Popover</h3>
    <goab-circular-progress variant="inline" size="large" message="Loading message..." [visible]="true"></goab-circular-progress>
    <goab-popover [target]="target">
      <p>This is a popover</p>
      It can be used for a number of different contexts.
      <ng-template #target>
        <goa-button type="secondary" size="compact">Click me</goa-button>
      </ng-template>
    </goab-popover>

    <h3>Table with pagination</h3>
    <goab-table width="100%" mb="xl">
      <thead>
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>Age</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of pageUsers; index as i">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.age }}</td>
        </tr>
      </tbody>
    </goab-table>

    <goab-pagination
      [itemCount]="users.length"
      [pageNumber]="page"
      (onChange)="handlePageChange($event)"
    >
    </goab-pagination>

    <h3>Notification</h3>
    <goab-notification type="information">
      Notification banner message
    </goab-notification>


    <h3>Table</h3>
    <goab-table width="100%" variant="relaxed">
    <thead>
      <tr>
        <th>
          Status
        </th>
        <th>
          Text
        </th>
        <th>
          Number
        </th>
        <th>
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          <goa-badge type="information" content="Badge text"></goa-badge>
        </td>
        <td>
          Lorem ipsum
        </td>
        <td>
          1234567890
        </td>
        <td>
          <goa-button type="tertiary">
            Action
          </goa-button>
        </td>
      </tr>
      <tr>
        <td>
          <goa-badge type="information" content="Badge text"></goa-badge>
        </td>
        <td>
          Lorem ipsum
        </td>
        <td>
          1234567890
        </td>
        <td>
          <goa-button type="tertiary">
            Action
          </goa-button>
        </td>
      </tr>
      <tr>
        <td>
          <goa-badge type="information" content="Badge text"></goa-badge>
        </td>
        <td>
          Lorem ipsum
        </td>
        <td>
          1234567890
        </td>
        <td>
          <goa-button type="tertiary">
            Action
          </goa-button>
        </td>
      </tr>
      <tr>
        <td>
          <goa-badge type="information" content="Badge text"></goa-badge>
        </td>
        <td>
          Lorem ipsum
        </td>
        <td>
          1234567890
        </td>
        <td>
          <goa-button type="tertiary">
            Action
          </goa-button>
        </td>
      </tr>
    </tbody>
  </goab-table>

  <goab-microsite-header type="alpha" version="12" feedbackurltarget="blank" headerurltarget="blank">
  </goab-microsite-header>

  <h3>Icon</h3>
  <goab-icon type="warning"></goab-icon>

  <h3>Hero Banner</h3>
  <goab-hero-banner heading="Heading" [actions]="action">
    <ng-template #action>
      <goab-button type="start" (onClick)="onClick()">
        Call to action
      </goab-button>
    </ng-template>
  </goab-hero-banner>

  <h3>Form Stepper (constrained)</h3>
    <goab-form-stepper (onChange)="updateStep($event)" [step]="step" type="constrained">
      <goab-form-step [status]="stepStates[0]" text="Personal details"></goab-form-step>
      <goab-form-step [status]="stepStates[1]" text="Employment history"></goab-form-step>
      <goab-form-step [status]="stepStates[2]" text="References"></goab-form-step>
      <goab-form-step [status]="stepStates[3]" text="Review"></goab-form-step>
    </goab-form-stepper>
    <goab-pages [current]="step" mb="3xl">
      <div>
        Page 1 content
        <goa-block>
          <goab-button (onClick)="onStep(1)" type="primary">Previous</goab-button>
          <goab-button (onClick)="onStep(2)" type="primary">Next</goab-button>
        </goa-block>
      </div>
      <div>
        Page 2 content
        <goa-block>
          <goab-button (onClick)="onStep(1)" type="primary">Previous</goab-button>
          <goab-button (onClick)="onStep(3)" type="primary">Next</goab-button>
        </goa-block>
      </div>
      <div>
        Page 3 content
        <goa-block>
          <goab-button (onClick)="onStep(2)" type="primary">Previous</goab-button>
          <goab-button (onClick)="onStep(4)" type="primary">Next</goab-button>
        </goa-block>
      </div>
      <div>
        Page 4 content
        <goa-block>
          <goab-button (onClick)="onStep(3)" type="primary">Previous</goab-button>
          <goab-button (onClick)="onStep(4)" type="primary">Next</goab-button>
        </goa-block>
      </div>
    </goab-pages>


  <h3>Form Stepper (Free)</h3>
    <goab-form-stepper (onChange)="updateStep($event)" type="free">
      <goab-form-step text="Personal details"></goab-form-step>
      <goab-form-step text="Employment history"></goab-form-step>
      <goab-form-step text="References"></goab-form-step>
      <goab-form-step text="Review"></goab-form-step>
    </goab-form-stepper>
    <goab-pages [current]="step" mb="3xl">
      <div>
        Page 1 content
      </div>
      <div>
        Page 2 content
      </div>
      <div>
        Page 3 content
      </div>
      <div>
        Page 4 content
      </div>
    </goab-pages>


  <h3>Badge</h3>
    <goab-badge type="information" content="Some content"></goab-badge>

  <h3>Button</h3>
    <goab-button (onClick)="onModalClick()" type="primary">Open Modal</goab-button>

  <h3>Dropdown</h3>

  <goab-dropdown (onChange)="onDropdownChange($event)" name="color" [filterable]="true">
    <goab-dropdown-item value="red" label="Red" />
    <goab-dropdown-item value="blue" label="Blue" />
    <goab-dropdown-item value="green" label="Green" />
  </goab-dropdown>

  <h3>Date Picker</h3>
  <goab-datepicker name="birthdate" (onChange)="onDateChange($event)" />

  <h3>Modal</h3>
    <goab-modal [open]="modalOpen" (onClose)="onModalClose()" [closable]="true" maxWidth="500px">
      <div slot="heading">This is the heading</div>
      <div slot="actions">This is the actions</div>
    </goab-modal>

  <h3>Accordion</h3>
    <goab-accordion heading="Heading" headingSize="medium">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
    </goab-accordion>

  <h3>App Header</h3>
    <goab-app-header url="https://example.com" heading="Ticket and Fine Payments">
      <a href="#">Support</a>
      <goab-app-header-menu heading="Tickets" leadingIcon="ticket">
        <a href="#">Cases</a>
        <a href="#">Payments</a>
        <a href="#">Outstanding</a>
      </goab-app-header-menu>
      <a href="#" className="interactive">Sign in</a>
    </goab-app-header>

  <h3>App Footer</h3>
    <goab-app-footer maxContentWidth="100%">
      <goab-app-footer-meta-section maxColumnCount="2" slot="meta">
        <a href="privacy.html">
          Privacy
        </a>
        <a href="disclaimer.html">
          Disclaimer
        </a>
        <a href="accessibility.html">
          Accessibility
        </a>
        <a href="using-alberta.html">
          Using Alberta.ca
        </a>
      </goab-app-footer-meta-section>

      <goab-app-footer-nav-section [maxColumnCount]="2" slot="nav">
          <a href="a.html">
            Arts and culture
          </a>
          <a href="b.html">
            Education and training
          </a>
          <a href="c.html">
            Family and social supports
          </a>
          <a href="d.html">
            Housing and community
          </a>
          <a href="e.html">
            Life events
          </a>
          <a href="a.html">
            Arts and culture
          </a>
          <a href="b.html">
            Education and training
          </a>
          <a href="c.html">
            Family and social supports
          </a>
          <a href="d.html">
            Housing and community
          </a>
          <a href="e.html">
            Life events
          </a>
      </goab-app-footer-nav-section>
    </goab-app-footer>

  <h3>ButtonGroup</h3>
    <goab-button-group gap="compact" alignment="end">
      <goab-button (onClick)="noop()" type="primary">Open Modal</goab-button>
      <goab-button (onClick)="noop()" type="secondary">Cancel</goab-button>
    </goab-button-group>

  <h3>Callout</h3>
    <goab-callout type="information">
      This is the callout
    </goab-callout>

  <h3>Checkbox</h3>
    <goab-checkbox text="Item"></goab-checkbox>

  <h3>Chip</h3>
    <goab-chip content="Chip text"></goab-chip>

  <h3>Container</h3>
    <goab-container type="interactive" accent="thin" padding="relaxed">
      <h2>
        Detach to use
      </h2>
      <p>
        Add things inside me
      </p>
    </goab-container>

  <h3>Details</h3>
    <goab-details heading="Detail Heading">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vel lacinia metus, sed sodales lectus. Aliquam sed volutpat velit. Sed in lacus ut dui placerat accumsan malesuada quis erat. Aenean mi diam, rhoncus vitae justo eu, venenatis maximus nunc. In vel est commodo, porttitor sem vel, tincidunt ipsum. In hac habitasse platea dictumst. Mauris varius mollis dui. Aenean ut dui eu arcu rutrum auctor. Curabitur cursus velit vel libero sollicitudin tincidunt. Proin tincidunt, enim et ultrices rhoncus, nibh leo imperdiet sapien, sed porttitor ipsum nulla non massa. Nulla facilisi.
    </goab-details>

  <h3>Divider</h3>
    <goab-divider></goab-divider>

  <h3>Form Item</h3>
    <goab-form-item label="Upload a file" helpText="Select a file">
      <goab-file-upload-input (_selectFile)="noop()" variant="dragdrop" />
      <goab-file-upload-card
        type="pdf"
        [size]="123"
        [progress]="34"
        filename="doc.pdf"
        (_delete)="noop()"
        (_cancel)="noop()"
      >
      </goab-file-upload-card>
    </goab-form-item>
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    GoabBadge,
    GoabButton,
    GoabDropdown,
    GoabDropdownItem,
    GoabDatePicker,
    GoabModal,
    GoabAccordion,
    GoabAppFooter,
    GoabAppFooterMetaSection,
    GoabAppFooterNavSection,
    GoabAppHeader,
    GoabAppHeaderMenu,
    GoabButtonGroup,
    GoabCallout,
    GoabCheckbox,
    GoabChip,
    GoabContainer,
    GoabDetails,
    GoabDivider,
    GoabFileUploadCard,
    GoabFileUploadInput,
    GoabFormItem,
    GoabFormStep,
    GoabFormStepper,
    GoabPages,
    GoabHeroBanner,
    GoabIcon,
    GoabIconButton,
    GoabInput,
    GoabNotificationBanner,
    GoabPagination,
    GoabPopover,
    GoabCircularProgress,
    GoabRadioGroup,
    GoabRadioItem,
    GoabSideMenu,
    GoabSideMenuGroup,
    GoabSideMenuHeading,
    GoabSkeleton,
    GoabTable,
    GoabTabs,
    GoabTab,
    GoabTextArea,
    GoabTooltip,
    GoabBlock,
  ]
})
export class ComponentWrapperPage {
  modalOpen = false;

  users: User[] = [];
  pageUsers: User[] = []
  page: number = 1;
  perPage: number = 10;
  sortUsers: User[] = [];

  blockData: string | undefined;

  itemFormCtrl = new FormControl();

  constructor() {
    for (let i = 0; i < 100; i++) {
      this.users.push({
        id: faker.string.uuid(),
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: faker.number.int({ min: 18, max: 60 }),
      });
    }
    this.pageUsers = this.users.slice(0, this.perPage)

    this.sortUsers = [
      {
        id: "99",
        firstName: "Christian",
        lastName: "Batz",
        age: 18
      },
      {
        id: "99",
        firstName: "Brain",
        lastName: "Wisozk",
        age: 19
      },
      {
        id: "99",
        firstName: "Neha",
        lastName: "Jones",
        age: 23
      },
      {
        id: "99",
        firstName: "Tristin",
        lastName: "Buckridge",
        age: 31
      }
    ];
  }

  // handlePageChange(e: any) {
  //   this.page = e.page;
  //   const offset = (this.page - 1) * this.perPage;
  //   this.pageUsers = this.users.slice(offset, offset + this.perPage)
  // }

  handlePageChange(e: GoabPaginationOnChangeDetail) {
    this.page = e.page;
    const offset = (this.page - 1) * this.perPage;
    this.pageUsers = this.users.slice(offset, offset + this.perPage)
  }

  stepStates: GoabFormStepStatus[] = [
    "unstarted",
    "unstarted",
    "unstarted",
    "unstarted",
  ]

  step = 1;
  updateStep(event: any) {
    console.log("anguarl update step", event)
    this.step = event.step;
  }

  noop() { }


  onStep(nextStep: number) {
    console.log("onstep", this.step, nextStep)
    this.stepStates[this.step - 1] = "complete";
    this.step = nextStep;
  }

  onClick() {
    console.log("nice click");
  }

  onModalClick() {
    this.modalOpen = true
  }

  onDropdownChange(e: GoabDropdownOnChangeDetail) {
    console.log("in dropdown change handler", e)
  }

  onStepChange(e: GoabFormStepperOnChangeDetail) {
    console.log("in form step change handler", e)
  }

  onDateChange(e: any) {
    console.log("in datepicker change handler", e.name, e.value)
  }

  onModalClose() {
    console.log("modal is now closed")
    this.modalOpen = false;
  }

  onRadioChange(e: GoabRadioGroupOnChangeDetail) {
    // handle change
    console.log("onChange", e);
  }

  // pagination

  // table


  onTextAreaChange(e: GoabTextAreaOnChangeDetail) {
    console.log(e.name, e.value);
  }

  loadData() {
    this.blockData = "this is the data"
  }

  // pagination

  // table

  handleSort(event: any) {
    const { sortBy, sortDir } = event.detail;
    this.sortUsers.sort(
      (a: any, b: any) => (a[sortBy] > b[sortBy] ? 1 : -1) * sortDir
    );
  }
}
