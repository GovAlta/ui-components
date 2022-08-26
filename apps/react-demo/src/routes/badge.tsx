import { GoABadge, GoAInfoBadge } from '@abgov/react-components';
import * as React from 'react';

export default function Badge() {
  return (
    <>
      <h3>Important</h3>
      <GoABadge type="important" content="Important" icon={true}></GoABadge>
      <GoABadge type="important" content="Important"></GoABadge>
      <GoABadge type="important" icon={true}></GoABadge>

      <br />
      <h3>Success</h3>
      <GoABadge type="success" content="Success" icon={true}></GoABadge>
      <GoABadge type="success" content="Success"></GoABadge>
      <GoABadge type="success" icon={true}></GoABadge>

      <br />
      <h3>Information</h3>
      <GoABadge type="information" icon={true}></GoABadge>
      <GoABadge type="information" content="Information"></GoABadge>
      <GoABadge type="information" icon={true}></GoABadge>

      <br />
      <h3>Emergency</h3>
      <GoABadge type="emergency" content="Emergency" icon={true}></GoABadge>
      <GoABadge type="emergency" content="Emergency"></GoABadge>
      <GoABadge type="emergency" icon={true}></GoABadge>

      <br />
      <h3>Dark</h3>
      <GoABadge type="dark" content="Dark" icon={true}></GoABadge>
      <GoABadge type="dark" content="Dark"></GoABadge>
      <GoABadge type="dark" icon={true}></GoABadge>

      <br />
      <h3>Midtone</h3>
      <GoABadge type="midtone" content="Midtone" icon={true}></GoABadge>
      <GoABadge type="midtone" content="Midtone"></GoABadge>
      <GoABadge type="midtone" icon={true}></GoABadge>

      <br />
      <h3>Light</h3>
      <GoABadge type="light" content="Light" icon={true}></GoABadge>
      <GoABadge type="light" content="Light"></GoABadge>
      <GoABadge type="light" icon={true}></GoABadge>

    </>
  );
}

