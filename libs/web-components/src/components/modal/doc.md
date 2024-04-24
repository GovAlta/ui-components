# Modal Library
A modal is a type of window that appears in front of the main page content and disables all other functionality while visible. Modals purposefully disrupt the user's workflow to capture their attention. The content in a modal should be succinct, direct, and contextually relevant to the user.

Use it like this:
```html
<goa-button id="button" (_click)="openModal()">Open Modal</goa-button>

<goa-modal id="modal" heading="Do you agree?" [open]="isOpen" (_close)="closeModal()" role="alertdialog" closable>
  <p>
    Lorem ipsum dolor sit.
  </p>
</goa-modal>
```
