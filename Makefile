#!/bin/bash 

IMAGE_NAME = storybook-image
REPO = https://gitlab.gov.ab.ca:dio/core/ui-components.git
BRANCH = angelo-s2i
SOURCE_SECRET = gitlab
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
	echo $(PATH_TO_OC)oc new-app $(REPO)#$(BRANCH) --source-secret='$(SOURCE_SECRET)' --name=ui-components
