import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { menus } from "./menus";

export interface Menu {
  active?: boolean;
  displayname: string;
  name: string;
  url?: string;
  items?: Menu[];
}

@Component({
  selector: "abgov-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  localMenus: Menu[] = [];
  activeMenu = "accordion";
  constructor(private router: Router) {
    this.localMenus = this.getItems();
  }

  getItems(menuItems: any = null): Menu[] {
    const children = menuItems ? menuItems : menus;
    return children.map((item: Menu) => ({
      displayname: item.displayname,
      name: item.name,
      url: item.url,
      active: item.name === this.activeMenu,
      items:
        item.items && item.items.length > 0
          ? this.getItems([...item.items])
          : [],
    }));
  }
  public handleMenu(event: any) {
    this.activeMenu = event.detail.name;
    this.localMenus = [...this.getItems()];
    if (event.detail.url) {
      this.router.navigateByUrl(event.detail.url);
    }
  }
}
