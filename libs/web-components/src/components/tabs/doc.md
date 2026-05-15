# Tabs
The tabs component lets users navigate between related sections of content, displaying one section at a time.
Use it like this:
```html
<goa-tabs initialtab="2">
  <goa-tab heading="Profile">
    <p>
      <b>Profile</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      bore et dolore magna aliqua.
    </p>
  </goa-tab>
  <goa-tab>
    <div slot="heading">
      Completed
      <goa-badge type="midtone" content="1"></goa-badge>
    </div>
    <p>
      <b>Completed:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </p>
  </goa-tab>
</goa-tabs>
```
