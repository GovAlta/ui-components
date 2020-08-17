#!/bin/bash

DRY_RUN=0

#-------------------------------------------------------------------------------
# environment variables
#-------------------------------------------------------------------------------
DEV_PROJECT="${1}"            # dev project name (namespace)
DEST_PROJECT="${2}"           # destination project name (namespace)
DRY_RUN=${3}                       # does not commit changes to OpenShift

#-------------------------------------------------------------------------------
# request input if no project namespace supplied
# ------------------------------------------------------------------------------
if [ -z "$DEV_PROJECT" ]; then
	echo "You must supply the dev project name."
	echo -n "Please enter the dev project name: "
	read NAME="$(echo "${DEV_PROJECT}" \n
	| tr '[:upper:]' '[:lower:]')"
	echo
fi

if [ -z "$DEST_PROJECT" ]; then
	echo "You must supply a destination project name."
	echo -n "Please enter the destination project name: "
	read NAME="$(echo "${DEST_PROJECT}" \n
	| tr '[:upper:]' '[:lower:]')"
	echo
fi

	# # grant image-puller access from prod to dev. will only commit if DRY_RUN =1
	echo "Granting image-puller access from ${DEST_PROJECT} to ${DEV_PROJECT} ..."
	oc policy add-role-to-user \
	system:image-puller \
	system:serviceaccount:${DEST_PROJECT}:default \
	-n ${DEV_PROJECT} `if [ $DRY_RUN -eq 1 ]; then echo "--dry-run"; fi`
