/**
 * Skeleton Component Configurations
 *
 * Skeletons show placeholder content while loading.
 */

import type { ComponentConfigurations } from './types';

export const skeletonConfigurations: ComponentConfigurations = {
  componentSlug: 'skeleton',
  componentName: 'Skeleton',
  defaultConfigurationId: 'basic',

  configurations: [
    {
      id: 'basic',
      name: 'Basic skeleton',
      description: 'Simple loading placeholder',
      code: {
        react: `<GoabSkeleton />`,
        angular: `<goab-skeleton></goab-skeleton>`,
        webComponents: `<goa-skeleton></goa-skeleton>`,
      },
    },
    {
      id: 'types',
      name: 'Types',
      description: 'Different skeleton shapes',
      code: {
        react: `<GoabSkeleton type="text" />
<GoabSkeleton type="title" />
<GoabSkeleton type="avatar" />
<GoabSkeleton type="header" />
<GoabSkeleton type="paragraph" />
<GoabSkeleton type="thumbnail" />`,
        angular: `<goab-skeleton type="text"></goab-skeleton>
<goab-skeleton type="title"></goab-skeleton>
<goab-skeleton type="avatar"></goab-skeleton>
<goab-skeleton type="header"></goab-skeleton>
<goab-skeleton type="paragraph"></goab-skeleton>
<goab-skeleton type="thumbnail"></goab-skeleton>`,
        webComponents: `<goa-skeleton type="text"></goa-skeleton>
<goa-skeleton type="title"></goa-skeleton>
<goa-skeleton type="avatar"></goa-skeleton>
<goa-skeleton type="header"></goa-skeleton>
<goa-skeleton type="paragraph"></goa-skeleton>
<goa-skeleton type="thumbnail"></goa-skeleton>`,
      },
    },
    {
      id: 'custom-size',
      name: 'Custom size',
      description: 'Skeleton with specific dimensions',
      code: {
        react: `<GoabSkeleton type="text" size={4} />
<GoabSkeleton type="image" width="200px" height="150px" />`,
        angular: `<goab-skeleton type="text" [size]="4"></goab-skeleton>
<goab-skeleton type="image" width="200px" height="150px"></goab-skeleton>`,
        webComponents: `<goa-skeleton type="text" size="4"></goa-skeleton>
<goa-skeleton type="image" width="200px" height="150px"></goa-skeleton>`,
      },
    },
    {
      id: 'card-loading',
      name: 'Card loading state',
      description: 'Skeleton inside a card',
      code: {
        react: `<GoabCard>
  <GoabSkeleton type="title" mb="s" />
  <GoabSkeleton type="paragraph" />
  <GoabSkeleton type="text" size={2} mt="m" />
</GoabCard>`,
        angular: `<goab-card>
  <goab-skeleton type="title" mb="s"></goab-skeleton>
  <goab-skeleton type="paragraph"></goab-skeleton>
  <goab-skeleton type="text" [size]="2" mt="m"></goab-skeleton>
</goab-card>`,
        webComponents: `<goa-card>
  <goa-skeleton type="title" mb="s"></goa-skeleton>
  <goa-skeleton type="paragraph"></goa-skeleton>
  <goa-skeleton type="text" size="2" mt="m"></goa-skeleton>
</goa-card>`,
      },
    },
  ],
};
