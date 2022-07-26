import { GoABadge, GoAInfoBadge } from '@abgov/react-components';
import * as React from 'react';

export default function Badge() {
  return (
    <>
      <h3>Warning</h3>
      <GoABadge type="warning" content="Warning" icon="warning"></GoABadge>
      <GoABadge type="warning" content="Warning"></GoABadge>
      <GoABadge type="warning" icon="warning"></GoABadge>

      <br />
      <h3>Success</h3>
      <GoABadge type="success" content="Success" icon="checkmark-circle"></GoABadge>
      <GoABadge type="success" content="Success"></GoABadge>
      <GoABadge type="success" icon="checkmark-circle"></GoABadge>

      <br />
      <h3>Information</h3>
      <GoABadge type="information" icon="information-circle"></GoABadge>
      <GoABadge type="information" content="Information"></GoABadge>
      <GoABadge type="information" icon="information-circle"></GoABadge>

      <br />
      <h3>Emergency</h3>
      <GoABadge type="emergency" content="Emergency" icon="alert-circle"></GoABadge>
      <GoABadge type="emergency" content="Emergency"></GoABadge>
      <GoABadge type="emergency" icon="alert-circle"></GoABadge>

      <br />
      <h3>Dark</h3>
      <GoABadge type="dark" content="Dark" icon="information-circle"></GoABadge>
      <GoABadge type="dark" content="Dark"></GoABadge>
      <GoABadge type="dark" icon="information-circle"></GoABadge>

      <br />
      <h3>Midtone</h3>
      <GoABadge type="midtone" content="Midtone" icon="information-circle"></GoABadge>
      <GoABadge type="midtone" content="Midtone"></GoABadge>
      <GoABadge type="midtone" icon="information-circle"></GoABadge>

      <br />
      <h3>Light</h3>
      <GoABadge type="light" content="Light" icon="information-circle"></GoABadge>
      <GoABadge type="light" content="Light"></GoABadge>
      <GoABadge type="light" icon="information-circle"></GoABadge>

    </>
  );
}

