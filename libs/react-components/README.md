# react-components

This library contains react components from the Government of Alberta.

## Installation

1. Add @abgov/react-components
   `npm add --save @abgov/react-components`
2. OPTIONAL: in package.json specify the allowed versions for installation
3. Add peer dependencies

## Documentation

Documentation is being worked on and will be provided soon.

## Usage

```
import { GoACallout } from '@abgov/react-components';
import { GoAButton } from '@abgov/react-components';
import { GoACheckbox } from '@abgov/react-components';
import { GoANotification } from '@abgov/react-components';
import { GoACard } from '@abgov/react-components';
import { GoACardGroup } from '@abgov/react-components';
import { GoABadge } from '@abgov/react-components';
import { GoAElementLoader } from '@abgov/react-components';
import { GoAPageLoader } from '@abgov/react-components';
import { GoADropdown, GoAOption } from '@abgov/react-components';
import { GoAHeader } from '@abgov/react-components';
import { GoAHeroBanner, GoAHeroBannerContent, GoAHeroBannerLink} from '@abgov/react-components';
import { GoARadioGroup } from '@abgov/react-components';

function App() {
    return (
        <div>
          <GoACallout type="emergency" title="Covid 19 Emergency" content="please be advised that in-center services are closed" />
          <GoAButton
            buttonType="primary"
            buttonSize="normal"
            toolTip="Hovering"
            onClick={()=> alert("You have clicked the button")}
          >Click Me!</GoAButton>
          <GoAButton
            buttonType="primary"
            buttonSize="normal"
            toolTip="Hovering"
            onClick={()=> alert("You have clicked the button")}
          >
            <div>Or click me instead</div>
          </GoAButton>
          <GoACheckbox checked={true}>Checkbox 1</GoACheckbox>
          <GoACard
            title = 'Energy Diversification Act',
            description = 'We're encouraging companies to turn out oil ad gas resources into more valuable products-creating good jobs for Albertans.',
            cardImageUrl = 'working-in-cold-hero-3_rdax_75.jpg',
            cardSize = 'auto',
            titleUrl = 'http://www.google.ca'
          />
          <GoANotification
            type="'important || 'information' || 'event' || 'emergency'",
            title='Notification Title',
            message="Information to the user goes in the message"
            isDismissable: true,
            notificationUrl: 'www.google.com',
            title: 'Hidden Title',
          </>
          <GoACardGroup title={'Dashboard'} layout='basic' >
            <GoACard  title="Energy Diversification Act 1"
                          description="We are encouraging companies to turn out oil ad gas resources into more valuable products-creating good jobs for Albertans."
                            titleUrl="http://www.google.ca"
                        cardWidth={400}
                        cardImageUrl="working-in-cold-hero-3_rdax_75.jpg"
              />
          </GoACardGroup>
          <GoABadge
                type='information'
                content='text content'
                icon={ icon variable}
              />
          <GoAElementLoader
                visible={true}
                size={25}
                baseColour='#c8eef9',
                spinnerColour='#0070c4'
            />
          <GoAPageLoader visible={true} type='infinite'>
              Loading...
          </GoAPageLoader>
          <GoADropdown  label="Fruits"  description="Choose you favorite fruit!"  multiple="false"  typeAheadMode="none">
            {
              items.map((i) => <GoAOption key={i.id} value={i.id} label={i.label} />)
            }
          </GoADropdown>
          <GoAHeader serviceName="Sample service" serviceHome="/" serviceLevel="Live" />
          <GoAHeroBanner title="Upgrading our bitumen" backgroundUrl='...'}>
            <GoAHeroBannerContent content='Resources are available to help ...'/>
            <GoAHeroBannerLink linkText='Learn more' linkUrl='...'/>
          </GoAHeroBanner>
          <GoARadioGroup
            name="fileSecurityOptions"
            items={getFileTypesValues()}
            onChange={(e) => {
              setUploadFileType(e);
            }}
        />
        </div>


    )
}

```
