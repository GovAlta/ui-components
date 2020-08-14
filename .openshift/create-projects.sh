#!/bin/bash

#-------------------------------------------------------------------------------
# environment variables
#-------------------------------------------------------------------------------
NAME="${1}"            # project name (namespace)
CREATE_TEST="${2}"     # will create test environemtn if 1
CREATE_PROD="${3}"     # will create prod environment if 1

#-------------------------------------------------------------------------------
# request input if no project namespace supplied
# -------------------------------------------------------------------------------
if [ -z "$NAME" ]; then
	echo "You must supply PROJECT_NAMESPACE."
	echo -n "Please enter the root namespace of the project: "
	read NAME="$(echo "${NAME}" \n 
	| tr '[:upper:]' '[:lower:]')"
	echo
fi

#-------------------------------------------------------------------------------
# default to ${PROJECT_NAMESPACE}-dev if no dev name supplied
#-------------------------------------------------------------------------------
# if [ -z "$DEV_PROJECT_NAME" ]; then
# 	DEV_PROJECT_NAME="dev"
# 	echo "Defaulting 'DEV_PROJECT_NAME' to ${DEV_PROJECT_NAME} ..."
# 	echo
# fi

#-------------------------------------------------------------------------------
# default to ${PROJECT_NAMESPACE}-test if no test name supplied
#-------------------------------------------------------------------------------
# if [ -z "$TEST_PROJECT_NAME" ]; then
# 	TEST_PROJECT_NAME="test"
# 	echo "Defaulting 'TEST_PROJECT_NAME' to ${TEST_PROJECT_NAME} ..."
# 	echo
# fi

#-------------------------------------------------------------------------------
# default to ${PROJECT_NAMESPACE}-prod if no prod name supplied
#-------------------------------------------------------------------------------
# if [ -z "$PROD_PROJECT_NAME" ]; then
# 	PROD_PROJECT_NAME="prod"
# 	echo "Defaulting 'PROD_PROJECT_NAME' to ${PROD_PROJECT_NAME} ..."
# 	echo
# fi

#-------------------------------------------------------------------------------
# set local project name vars
#-------------------------------------------------------------------------------
DEV_PROJECT="${NAME}-dev"
TEST_PROJECT="${NAME}-test"
PROD_PROJECT="${NAME}-prod"

#-------------------------------------------------------------------------------
# create projects
#-------------------------------------------------------------------------------
echo "--------------------------------------------------------------------------------"
echo "Creating projects ..."
echo "--------------------------------------------------------------------------------"
# create dev project. will not commit if DRY_RUN = 1
echo "Creating project ${DEV_PROJECT} ..."
oc new-project ${DEV_PROJECT} #`if [ $DRY_RUN -eq 1 ]; then echo "--dry-run"; fi`

# only create test if CREATE_TEST == 1
if [ "${CREATE_TEST}" == 1 ]; then

	# create test project. will only commit if DRY_RUN =1
	echo "Creating project ${TEST_PROJECT} ..."
	oc new-project ${TEST_PROJECT} 

	# grant image-puller access from test to dev. will only commit if DRY_RUN =1
	# echo "Granting image-puller access from ${TEST_PROJECT} to ${DEV_PROJECT} ..."	
	# oc policy add-role-to-user \
	# system:image-puller \
	# system:serviceaccount:${TEST_PROJECT}:default \
	# -n ${DEV_PROJECT} `if [ $DRY_RUN -eq 1 ]; then echo "--dry-run"; fi`
fi

# only create test if CREATE_PROD == 1
if [ "${CREATE_PROD}" == 1 ]; then

	# create test project. will only commit if DRY_RUN =1
	echo "Creating project ${PROD_PROJECT} ..."
	oc new-project ${PROD_PROJECT} 

	# # grant image-puller access from prod to dev. will only commit if DRY_RUN =1
	# echo "Granting image-puller access from ${PROD_PROJECT} to ${TEST_PROJECT} ..."	
	# oc policy add-role-to-user \
	# system:image-puller \
	# system:serviceaccount:${PROD_PROJECT}:default \
	# -n ${DEV_PROJECT} `if [ $DRY_RUN -eq 1 ]; then echo "--dry-run"; fi`
fi

echo "Done creating projects ..."