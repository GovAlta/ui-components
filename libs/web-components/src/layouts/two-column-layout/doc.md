# Two column layout
A two column layout to use as a starting point for your page. Typically, this is used for a side navigation alongside the main content of a page.

Use it like this:
```html
<goa-two-column-layout>
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
  <h1>Heading 1</h1>
  <p>
    Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.
  </p>
  <section slot="footer">
    <goa-app-footer></goa-app-footer>
  </section>
</goa-two-column-layout>
```
