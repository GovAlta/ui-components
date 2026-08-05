---
name: write-wrapper
description: Use when writing or updating a React or Angular framework wrapper for a GovAlta/ui-components web component. Covers the React wrapper template (private WCProps versus exported props, boolean and event handling) and the Angular wrapper template (the isReady and setTimeout pattern, attr bindings, form control value accessor).
---

# Skill: Write a framework wrapper

The cross-framework invariant, that every Svelte prop, event, or API change needs matching React and Angular updates, lives in the `framework-wrappers` rule. This skill is the templates and patterns for writing the wrappers themselves.

## React Wrapper Template

Two interfaces: WCProps (private, lowercase, strings) and GoabXxxProps (exported, camelCase, real types).

```typescript
interface WCProps extends Margins {
  name: string;
  disabled?: string;
  testid?: string;
}

export interface GoabXxxProps extends Margins, DataAttributes {
  name: string;
  disabled?: boolean;
  onChange?: (detail: GoabXxxOnChangeDetail) => void;
  testId?: string;
  children?: ReactNode;
}

export function GoabXxx({ disabled, onChange, children, ...rest }: GoabXxxProps): JSX.Element {
  const el = useRef<HTMLElement>(null);
  const _props = transformProps<WCProps>(rest, lowercase);

  useEffect(() => {
    if (!el.current) return;
    const current = el.current;
    const listener = (e: Event) => {
      const detail = (e as CustomEvent<GoabXxxOnChangeDetail>).detail;
      onChange?.({ ...detail, event: e });
    };
    current.addEventListener("_change", listener);
    return () => current.removeEventListener("_change", listener);
  }, [el, onChange]);

  return (
    <goa-xxx ref={el} {..._props} disabled={disabled ? "true" : undefined}>
      {children}
    </goa-xxx>
  );
}
```

Key: Boolean props pass `"true"` or `undefined`, never `"true"` or `"false"`. Event callbacks always spread detail and add `event: e`. Types from `@abgov/ui-components-common`.

## Angular Wrapper Template

Non-form components extend `GoabBaseComponent`. Form controls extend `GoabControlValueAccessor`.

```typescript
@Component({
  standalone: true,
  selector: "goab-xxx",
  template: `
    @if (isReady) {
      <goa-xxx
        [attr.type]="type"
        [attr.disabled]="disabled ? 'true' : undefined"
        [attr.testid]="testId"
        [attr.mt]="mt"
        [attr.mb]="mb"
        [attr.ml]="ml"
        [attr.mr]="mr"
        (_click)="_onClick($event)"
      >
        <ng-content />
      </goa-xxx>
    }
  `,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class GoabXxx extends GoabBaseComponent implements OnInit {
  @Input() type?: GoabXxxType;
  @Input({ transform: booleanAttribute }) disabled?: boolean;
  @Output() onClick = new EventEmitter<GoabXxxOnClickDetail>();

  isReady = false;
  constructor(private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isReady = true;
      this.cdr.detectChanges();
    }, 0);
  }

  _onClick(e: Event) {
    this.onClick.emit({
      ...(e as CustomEvent<GoabXxxOnClickDetail>).detail,
      event: e,
    });
  }
}
```

Key: `isReady` + `setTimeout(0)` is non-negotiable (every component). Use `[attr.xxx]` for web component attributes. Use `booleanAttribute` transform for boolean inputs. Form controls add `#goaComponentRef`, `NG_VALUE_ACCESSOR`, `markAsTouched()`.
