/**
 * Skeleton Component Configurations
 *
 * Skeletons show placeholder content while loading.
 */

import type { ComponentConfigurations } from "./types";

export const skeletonConfigurations: ComponentConfigurations = {
  componentSlug: "skeleton",
  componentName: "Skeleton",
  defaultConfigurationId: "basic",

  configurations: [
    {
      id: "basic",
      name: "Text",
      description: "Text loading placeholders",
      code: {
        react: `<GoabSkeleton type="text" mb="s" />
<GoabSkeleton type="text" mb="s" />
<GoabSkeleton type="text" mb="s" />
<GoabSkeleton type="text" />`,
        angular: `<goab-skeleton type="text" mb="s"></goab-skeleton>
<goab-skeleton type="text" mb="s"></goab-skeleton>
<goab-skeleton type="text" mb="s"></goab-skeleton>
<goab-skeleton type="text"></goab-skeleton>`,
        webComponents: `<goa-skeleton type="text" mb="s"></goa-skeleton>
<goa-skeleton type="text" mb="s"></goa-skeleton>
<goa-skeleton type="text" mb="s"></goa-skeleton>
<goa-skeleton type="text"></goa-skeleton>`,
      },
    },
    {
      id: "content-types",
      name: "Content types",
      description: "Text, title, header, and paragraph skeletons",
      code: {
        react: `<GoabSkeleton type="text" mb="s" />
<GoabSkeleton type="text-small" mb="s" />
<GoabSkeleton type="title" mb="s" />
<GoabSkeleton type="header" mb="s" />
<GoabSkeleton type="paragraph" />`,
        angular: `<goab-skeleton type="text" mb="s"></goab-skeleton>
<goab-skeleton type="text-small" mb="s"></goab-skeleton>
<goab-skeleton type="title" mb="s"></goab-skeleton>
<goab-skeleton type="header" mb="s"></goab-skeleton>
<goab-skeleton type="paragraph"></goab-skeleton>`,
        webComponents: `<goa-skeleton type="text" mb="s"></goa-skeleton>
<goa-skeleton type="text-small" mb="s"></goa-skeleton>
<goa-skeleton type="title" mb="s"></goa-skeleton>
<goa-skeleton type="header" mb="s"></goa-skeleton>
<goa-skeleton type="paragraph"></goa-skeleton>`,
      },
    },
    {
      id: "media-types",
      name: "Media types",
      description: "Avatar, thumbnail, and image skeletons",
      code: {
        react: `<GoabSkeleton type="avatar" mb="s" />
<GoabSkeleton type="thumbnail" mb="s" />
<GoabSkeleton type="image" width="200px" height="150px" />`,
        angular: `<goab-skeleton type="avatar" mb="s"></goab-skeleton>
<goab-skeleton type="thumbnail" mb="s"></goab-skeleton>
<goab-skeleton type="image" width="200px" height="150px"></goab-skeleton>`,
        webComponents: `<goa-skeleton type="avatar" mb="s"></goa-skeleton>
<goa-skeleton type="thumbnail" mb="s"></goa-skeleton>
<goa-skeleton type="image" width="200px" height="150px"></goa-skeleton>`,
      },
    },
    {
      id: "composite-types",
      name: "Composite types",
      description: "Pre-built skeleton layouts for common patterns",
      code: {
        react: `<GoabSkeleton type="lines" mb="l" />
<GoabSkeleton type="profile" mb="l" />
<GoabSkeleton type="card" mb="l" />
<GoabSkeleton type="article" />`,
        angular: `<goab-skeleton type="lines" mb="l"></goab-skeleton>
<goab-skeleton type="profile" mb="l"></goab-skeleton>
<goab-skeleton type="card" mb="l"></goab-skeleton>
<goab-skeleton type="article"></goab-skeleton>`,
        webComponents: `<goa-skeleton type="lines" mb="l"></goa-skeleton>
<goa-skeleton type="profile" mb="l"></goa-skeleton>
<goa-skeleton type="card" mb="l"></goa-skeleton>
<goa-skeleton type="article"></goa-skeleton>`,
      },
    },
  ],
};
