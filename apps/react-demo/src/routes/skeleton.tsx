import { GoASkeleton } from '@abgov/react-components';
import * as React from 'react';

export default function Skeleton() {
  return (
    <>
      <h1>Skeleton</h1>
      <h2>Text</h2>
      <GoASkeleton type="text"></GoASkeleton>
      <GoASkeleton type="text"></GoASkeleton>
      <GoASkeleton type="text"></GoASkeleton>
      <GoASkeleton type="text"></GoASkeleton>

      <h2>Paragraph</h2>
      <GoASkeleton type="paragraph"></GoASkeleton>

      <h2>Small text</h2>
      <GoASkeleton type="text-small"></GoASkeleton>
      <GoASkeleton type="text-small" size={2}></GoASkeleton>
      <GoASkeleton type="text-small" size={3}></GoASkeleton>
      <GoASkeleton type="text-small" size={4}></GoASkeleton>

      <h2>Cards</h2>
      <GoASkeleton type="card"></GoASkeleton>
      <GoASkeleton type="card" size={2}></GoASkeleton>
      <GoASkeleton type="card" size={3}></GoASkeleton>
      <GoASkeleton type="card" size={4}></GoASkeleton>

      <h2>Avatars</h2>
      <GoASkeleton type="avatar"></GoASkeleton>
      <GoASkeleton type="avatar" size={2}></GoASkeleton>
      <GoASkeleton type="avatar" size={3}></GoASkeleton>
      <GoASkeleton type="avatar" size={4}></GoASkeleton>

      <h2>Headers</h2>
      <GoASkeleton type="header"></GoASkeleton>
      <GoASkeleton type="header" size={2}></GoASkeleton>
      <GoASkeleton type="header" size={3}></GoASkeleton>
      <GoASkeleton type="header" size={4}></GoASkeleton>

      <h2>Thumbnails</h2>
      <GoASkeleton type="thumbnail"></GoASkeleton>
      <GoASkeleton type="thumbnail" size={2}></GoASkeleton>
      <GoASkeleton type="thumbnail" size={3}></GoASkeleton>
      <GoASkeleton type="thumbnail" size={4}></GoASkeleton>

      <h2>Profiles</h2>
      <GoASkeleton type="profile"></GoASkeleton>
      <GoASkeleton type="profile" size={2}></GoASkeleton>
      <GoASkeleton type="profile" size={3}></GoASkeleton>
      <GoASkeleton type="profile" size={4}></GoASkeleton>

    </>
  );
}
