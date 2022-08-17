#### CREATE

# svelte library 
sl:
	npx nx generate @nxext/svelte:library $(name) --e2eTestRunner=none --skipFormat --no-interactive --buildable --publishable --importPath=@abgov/$(name)

# svelte component
sc:
	npx nx generate @nxext/svelte:component $(name) --project=web-components --no-interactive

# react component
rc:
	npx nx generate @nrwl/react:component $(name) --project=react-components --style=none --export --no-interactive

# storybook
story:
	cp libs/docs/src/_stories.mdx.template libs/docs/src/components/common/$(name).stories.mdx

#### BUILD

lint:
	npx nx run-many --target=lint --projects=react-components,styles,web-components

web-components:
	npm run build web-components --withDeps --configuration production

styles:
	npm run build styles --withDeps --configuration production

react-components:
	npm run build react-components --withDeps --configuration production

react-demo:
	npm run build react-demo --withDeps --configuration production

build: styles web-components react-components react-demo

#### RUN 

dev:
	cd libs/web-components && npm run dev

storybook:
	npm run run:docs-storybook

react-app:
	npx nx run react-demo:serve 

demo:
	cd libs/web-components && npm run demo

#### TEST

test:	
	npm run test:watch

coverage:	
	npx nx run web-components:test --codeCoverage


.DEFAULT_GOAL := build
