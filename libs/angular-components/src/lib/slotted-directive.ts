import {
  Directive,
  EmbeddedViewRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
} from "@angular/core";

@Directive({
  standalone: true,
  selector: "[goabSlottedTemplate]",
})
export class GoabSlottedTemplate implements OnChanges {
  private viewContainer = inject(ViewContainerRef);
  private view?: EmbeddedViewRef<unknown>;

  @Input() goabSlottedTemplate?: TemplateRef<unknown>;
  @Input() slotName?: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["goabSlottedTemplate"]) {
      this.viewContainer.clear();
      this.view = undefined;

      // Keep the view so each rendered root node can be slotted individually.
      if (this.goabSlottedTemplate) {
        this.view = this.viewContainer.createEmbeddedView(this.goabSlottedTemplate);
      }
    }

    this.applySlotToRootNodes();
  }

  private applySlotToRootNodes(): void {
    if (!this.view || !this.slotName) {
      return;
    }

    // AppHeader navigation reads each slotted child as a menu item.
    // A slotted wrapper would hide the template's actual root items.
    for (const node of this.view.rootNodes) {
      const element = node as Element;

      if (element.nodeType === 1 && typeof element.setAttribute === "function") {
        element.setAttribute("slot", this.slotName);
      }
    }
  }
}
