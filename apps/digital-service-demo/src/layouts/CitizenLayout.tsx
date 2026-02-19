import { Outlet } from 'react-router-dom';
import { GoabOneColumnLayout, GoabPageBlock, GoabAppHeader } from '@abgov/react-components';

export function CitizenLayout() {
  return (
    <>
      <GoabAppHeader heading="Apply for a Service" url="/" />
      <GoabOneColumnLayout>
        <GoabPageBlock width="704px">
          <Outlet />
        </GoabPageBlock>
      </GoabOneColumnLayout>
    </>
  );
}
