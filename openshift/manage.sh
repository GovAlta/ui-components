#!/bin/bash

: <<'END'
The script must be run within the /openshift folder

To create a new application:
./manage.sh create

To delete the applicaiton:
./manage.sh delete

For example:
./manage.sh create

./manage.sh delete
END

APP_NAME='core-ui-components-master'
if [[ "$1" == "create" ]]; then
	echo '[INFO] start to create ${APP_NAME}'
	oc process -f core-ui-components-templates.yaml | oc create -f -
fi

if [[ "$1" == "delete" ]]; then
	echo '[INFO] start to delete ${APP_NAME}'
	oc delete all --selector app=core-ui-components-master
fi