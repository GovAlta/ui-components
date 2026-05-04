# Framework Wrapper Standards

## Cross-Framework Rule

Every Svelte prop, event, or API change requires corresponding React and Angular wrapper updates. Props must match across all three frameworks (required/optional, naming, types, data formats). This is the #1 source of review rounds.

CSS-only changes in the Svelte file do not need wrapper updates. Wrappers contain no styling — they pass attributes through to the web component, which owns all CSS.

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
