# Left Navigation Menu

Use it like this:
```html
<goax-sidebar (_change)="handleMenu($event)">
      <goax-sidebar-item
        *ngFor="let localMenu of localMenus"
        [active]="localMenu.active"
        [displayname]="localMenu.displayname"
        [name]="localMenu.name"
        [url]="localMenu.url"
      >
        <ng-template
          *ngIf="localMenu.items"
          ngFor
          let-subMenu
          [ngForOf]="localMenu.items"
        >
          <goax-sidebar-item
            [active]="subMenu.active"
            [name]="subMenu.name"
            [displayname]="subMenu.displayname"
            [url]="subMenu.url"
          >
          </goax-sidebar-item>
        </ng-template>
      </goax-sidebar-item>
</goax-sidebar>
```
