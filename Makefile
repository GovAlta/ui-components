# Requirements 
# ============
# inotify-tools is required to run storybook


# CREATE


# svelte library 
csl:
	npx nx generate @nxext/svelte:library $(name) --e2eTestRunner=none --skipFormat --no-interactive --buildable --publishable --importPath=@abgov/$(name)

# svelte component
csc:
	npx nx generate @nxext/svelte:component $(name) --project=web-components --no-interactive

# react component
crc:
	npx nx generate @nrwl/react:component $(name) --project=react-components --style=none --export --no-interactive


# BUILD


build:
	npm run build web-components --withDeps --configuration production


# RUN 


storybook:
	while inotifywait -e modify -r libs/web-components/src --exclude spec\.ts; do make build; done &
	echo "Starting storybook..."
	npm run run:docs-storybook

storybook-new:
	cp libs/docs/src/_stories.mdx.template libs/docs/src/components/common/$(name).stories.mdx


# TEST


test:	
	npm run test:watch
