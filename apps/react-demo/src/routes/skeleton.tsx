import { GoASkeleton } from '@abgov/react-components';
import * as React from 'react';

export default function Skeleton() {
  return (
    <>
      <h3>Text</h3>
      <GoASkeleton type="text"></GoASkeleton>
      <GoASkeleton type="text"></GoASkeleton>
      <GoASkeleton type="text"></GoASkeleton>
      <GoASkeleton type="text"></GoASkeleton>

      <br />
      <h3>Paragraph</h3>
      <GoASkeleton type="paragraph"></GoASkeleton>

      <br />
      <h3>Small text</h3>
      <GoASkeleton type="text-small"></GoASkeleton>
      <GoASkeleton type="text-small" size={2}></GoASkeleton>
      <GoASkeleton type="text-small" size={3}></GoASkeleton>
      <GoASkeleton type="text-small" size={4}></GoASkeleton>

      <br />
      <h3>Cards</h3>
      <GoASkeleton type="card"></GoASkeleton>
      <GoASkeleton type="card" size={2}></GoASkeleton>
      <GoASkeleton type="card" size={3}></GoASkeleton>
      <GoASkeleton type="card" size={4}></GoASkeleton>

      <br />
      <h3>Avatars</h3>
      <GoASkeleton type="avatar"></GoASkeleton>
      <GoASkeleton type="avatar" size={2}></GoASkeleton>
      <GoASkeleton type="avatar" size={3}></GoASkeleton>
      <GoASkeleton type="avatar" size={4}></GoASkeleton>

      <br />
      <h3>Headers</h3>
      <GoASkeleton type="header"></GoASkeleton>
      <GoASkeleton type="header" size={2}></GoASkeleton>
      <GoASkeleton type="header" size={3}></GoASkeleton>
      <GoASkeleton type="header" size={4}></GoASkeleton>

      <br />
      <h3>Thumbnails</h3>
      <GoASkeleton type="thumbnail"></GoASkeleton>
      <GoASkeleton type="thumbnail" size={2}></GoASkeleton>
      <GoASkeleton type="thumbnail" size={3}></GoASkeleton>
      <GoASkeleton type="thumbnail" size={4}></GoASkeleton>

      <br />
      <h3>Profiles</h3>
      <GoASkeleton type="profile"></GoASkeleton>
      <GoASkeleton type="profile" size={2}></GoASkeleton>
      <GoASkeleton type="profile" size={3}></GoASkeleton>
      <GoASkeleton type="profile" size={4}></GoASkeleton>

    </>
  );
}
