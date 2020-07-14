#!/bin/bash 

IMAGE_NAME = storybook-image
REPO = https://gitlab.gov.ab.ca:dio/core/ui-components.git
BRANCH = dev
SOURCE_SECRET = ui-components-ssh
PATH_TO_OC = ~/Source/Minishift/

.PHONY: build
build:
	docker build -t $(IMAGE_NAME) .

.PHONY: test
test:
	docker build -t $(IMAGE_NAME)-candidate .
	IMAGE_NAME=$(IMAGE_NAME)-candidate test/run

.PHONY: deploy-app
deploy-app:
	$(PATH_TO_OC)oc new-app $(REPO)#$(BRANCH) --source-secret=ui-components-ssh --dry-run=false --name=ui-components --strategy=Source
