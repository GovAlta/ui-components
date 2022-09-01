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

build-lint:
	npx nx run-many --target=lint --projects=react-components,styles,web-components

build-web-components:
	npm run build web-components --withDeps --configuration production

build-styles:
	npm run build styles --withDeps --configuration production

build-react-components:
	npm run build react-components --withDeps --configuration production

build-react-app:
	npm run build react-demo --withDeps --configuration production

build-ng-app:
	npm run build react-demo --withDeps --configuration production

build: build-styles build-web-components build-react-components build-react-app build-ng-app

#### RUN 

dev:
	cd libs/web-components && npm run dev

storybook:
	npm run run:docs-storybook

react-app:
	npx nx run react-demo:serve 

ng-app:
	npx nx run angular-demo:serve 

demo:
	cd libs/web-components && npm run demo

#### TEST

test:	
	npm run test:watch

coverage:	
	npx nx run web-components:test --codeCoverage


.DEFAULT_GOAL := build
