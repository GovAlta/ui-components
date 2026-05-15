# Pagination Library
Pagination helps users navigate between multiple pages or screens that are part of a related set.

Use it like this:

```html
<goa-pagination
  [itemcount]="users.length"
  perpagecount="10"
  [pagenumber]="page"
  (_change)="handlePageChange($event)">
</goa-pagination>
```
