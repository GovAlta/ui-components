# Three column layout
A three column layout to use as a starting point for your page. Typically, this is used for a side navigation alongside the main content of a page and a sidebar on the right.

Use it like this:
```html
<goa-three-column-layout>
  <section slot="header">
    <goa-app-header></goa-app-header>
  </section>
  <section slot="nav">
    <a href="#dashboard">Dashboard</a>
    <a href="#accounts">Accounts</a>
    <a href="#invoices">Invoices</a>
    <a href="#employees">Employees</a>
    <a href="#claims">Claims</a>
  </section>
  <h1>Main content</h1>
  <p>Add in your content here</p>
  <section slot="sidebar">
    <h2>Sidebar</h2>
    <p>Add in your content here</p>
  </section>
  <section slot="footer">
    <goa-app-footer></goa-app-footer>
  </section>
</goa-three-column-layout>
```
