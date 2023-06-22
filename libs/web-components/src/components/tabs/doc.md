# Tabs
The tabs component lets users navigate between related sections of content, displaying one section at a time.
Use it like this:
```html
<goa-tabs>
  <goa-tab-item open="true" heading="Profile">
    <div slot="content">
      <p>
        <b>Profile</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        bore et dolore magna aliqua.
      </p>
    </div>
  </goa-tab-item>
  <goa-tab-item>
    <div slot="heading">
      Completed
      <goa-badge type="midtone" content="1"></goa-badge>
    </div>
    <div slot="content">
      <p>
        <b>Completed:</b> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua.</p>
    </div>
  </goa-tab-item>
</goa-tabs>
```
