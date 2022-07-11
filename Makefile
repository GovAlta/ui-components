# Requirements 
# ============
# inotify-tools is required to run storybook


# CREATE


# svelte library 
sl:
	npx nx generate @nxext/svelte:library $(name) --e2eTestRunner=none --skipFormat --no-interactive --buildable --publishable --importPath=@abgov/$(name)

# svelte component
sc:
	npx nx generate @nxext/svelte:component $(name) --project=web-components --no-interactive

# react component
rc:
	npx nx generate @nrwl/react:component $(name) --project=react-components --style=none --export --no-interactive


# BUILD

web-components:
	npm run build web-components --withDeps --configuration production

styles:
	npm run build styles --withDeps --configuration production

react-components:
	npm run build react-components --withDeps --configuration production

build: styles web-components react-components

# RUN 


storybook:
	# while inotifywait -e modify -r libs/web-components/src --exclude spec\.ts; do make build; done &
	echo "Starting storybook..."
	npm run run:docs-storybook & (cd libs/web-components && npm run dev)

storybook-new:
	cp libs/docs/src/_stories.mdx.template libs/docs/src/components/common/$(name).stories.mdx

react-app:
	npx nx run react-demo:serve & (cd libs/web-components && npm run dev)

demo:
	cd libs/web-components && npm run demo


# TEST


test:	
	npm run test:watch


.DEFAULT_GOAL := build
