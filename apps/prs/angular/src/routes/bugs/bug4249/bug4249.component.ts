import { Component } from "@angular/core";
import { NgTemplateOutlet } from "@angular/common";
import {
  GoabBlock,
  GoabButton,
  GoabButtonGroup,
  GoabDivider,
  GoabDrawer,
  GoabLink,
  GoabModal,
  GoabScrollPanel,
  GoabText,
} from "@abgov/angular-components";

type DrawerExample =
  | "content-left"
  | "content-right"
  | "content-bottom"
  | "overflow-left"
  | "overflow-right"
  | "overflow-bottom"
  | "fixed-left"
  | "fixed-right"
  | "fixed-bottom";

type ModalExample = "content" | "overflow" | "fixed" | "missing-slots";

@Component({
  standalone: true,
  selector: "abgov-bug4249",
  templateUrl: "./bug4249.component.html",
  imports: [
    GoabBlock,
    GoabButton,
    GoabButtonGroup,
    GoabDivider,
    GoabDrawer,
    GoabLink,
    GoabModal,
    GoabScrollPanel,
    GoabText,
    NgTemplateOutlet,
  ],
})
export class Bug4249Component {
  drawerExample: DrawerExample | null = null;
  modalExample: ModalExample | null = null;
  readonly overflowRows = Array.from({ length: 30 }, (_, index) => index + 1);

  get drawerPosition(): "left" | "right" | "bottom" {
    if (this.drawerExample?.endsWith("left")) return "left";
    if (this.drawerExample?.endsWith("bottom")) return "bottom";
    return "right";
  }

  get drawerHasHeading(): boolean {
    return this.drawerExample !== "content-right";
  }

  get drawerHasActions(): boolean {
    return this.drawerExample !== "content-bottom";
  }

  get drawerHasOverflow(): boolean {
    return this.drawerExample?.startsWith("overflow") ?? false;
  }

  get drawerHasFixedContent(): boolean {
    return this.drawerExample?.startsWith("fixed") ?? false;
  }

  openDrawer(example: DrawerExample): void {
    this.drawerExample = example;
  }

  closeDrawer(): void {
    this.drawerExample = null;
  }

  openModal(example: ModalExample): void {
    this.modalExample = example;
  }

  closeModal(): void {
    this.modalExample = null;
  }
}
