import { storiesOf, moduleMetadata } from '@storybook/angular';
import { GoAButtonComponent } from './goa.button.component';
import { withKnobs, text, files } from '@storybook/addon-knobs/angular';
import { AngularComponentsModule } from '../angular-components.module';

const modules = {
  imports: [AngularComponentsModule],
  declarations: [GoAButtonComponent],
};

const template = `
<div>
  <h1>Button</h1>
  <div style="display: flex; justify-content: center;">
    <goa-button [title]=title [buttonType]=buttonType></goa-button>
    <goa-button [title]=title buttonType=secondary></goa-button>
    <goa-button [title]=title buttonType=tertiary></goa-button>
  </div>
</div>
`;

const params = `
@Input() title: string;
@Input() buttonType: string;
`;

storiesOf('Design System Angular.Basic Elements', module)
  .addDecorator(withKnobs)
  .addDecorator(moduleMetadata(modules))
  .add('Button', () => ({
    component: GoAButtonComponent,
    props: {
      title: text('title', 'Button'),
      buttonType: text('buttonType', ''),
    },
  }));
