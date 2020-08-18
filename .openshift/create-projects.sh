#!/bin/bash

# import environment variables from CONFIG file
. CONFIG # equivalent to source ./CONFIG

echo -e "\e[1;32mCreating projects...\e[0m"

# create dev project. will not commit if DRY_RUN = 1
echo "Creating project ${DEV_NAMESPACE} ..."
oc new-project ${DEV_NAMESPACE} > /dev/null

# only create test if CREATE_TEST == 1
if [ "${CREATE_TEST}" == 1 ]; then

	echo "Creating project ${TEST_NAMESPACE} ..."
	oc new-project ${TEST_NAMESPACE} > /dev/null
fi

# only create test if CREATE_PROD == 1
if [ "${CREATE_PROD}" == 1 ]; then

	echo "Creating project ${PROD_NAMESPACE} ..."
	oc new-project ${PROD_NAMESPACE} > /dev/null
fi
