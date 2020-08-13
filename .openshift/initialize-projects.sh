#!/bin/bash

USER_ID="$(id -u)"
SCRIPT_DIR=$(dirname $0)

# ===========================================================================
# setup environment variables
# ===========================================================================

# project variables
PROJECT_NAMESPACE="${1}"            # project name (namespace)
DEV_PROJECT_NAME="${2}"             # uses this name for dev if supplied
TEST_PROJECT_NAME="${3}"            # uses this name for test if supplied
PROD_PROJECT_NAME="${4}"            # uses this name for prod if supplied

# ---------------------------------------------------------------------------
# request input if no project namespace supplied
if [ -z "$PROJECT_NAMESPACE" ]; then
	echo "You must supply PROJECT_NAMESPACE."
	echo -n "Please enter the root namespace of the project: "
	read PROJECT_NAMESPACE
	PROJECT_NAMESPACE="$(echo "${PROJECT_NAMESPACE}" | tr '[:upper:]' '[:lower:]')"
	echo
fi

# ---------------------------------------------------------------------------
# default to ${PROJECT_NAMESPACE}-dev if no dev name supplied
if [ -z "$DEV_PROJECT_NAME" ]; then
	DEV_PROJECT_NAME="dev"
	echo "Defaulting 'DEV_PROJECT_NAME' to ${DEV_PROJECT_NAME} ..."
	echo
fi

# default to ${PROJECT_NAMESPACE}-test if no test name supplied
if [ -z "$TEST_PROJECT_NAME" ]; then
	TEST_PROJECT_NAME="test"
	echo "Defaulting 'TEST_PROJECT_NAME' to ${TEST_PROJECT_NAME} ..."
	echo
fi

# default to ${PROJECT_NAMESPACE}-prod if no prod name supplied
if [ -z "$PROD_PROJECT_NAME" ]; then
	PROD_PROJECT_NAME="prod"
	echo "Defaulting 'PROD_PROJECT_NAME' to ${PROD_PROJECT_NAME} ..."
	echo
fi

# ---------------------------------------------------------------------------
DEV_PROJECT="${PROJECT_NAMESPACE}-${DEV_PROJECT_NAME}"
TEST_PROJECT="${PROJECT_NAMESPACE}-${TEST_PROJECT_NAME}"
PROD_PROJECT="${PROJECT_NAMESPACE}-${PROD_PROJECT_NAME}"

echo "============================================================================="
echo "Creating projects ..."
echo "-----------------------------------------------------------------------------"

oc new-project --name=${DEV_PROJECT}
oc new-project --name=${TEST_PROJECT}
oc new-project --name=${PROD_PROJECT}

# ===================================================================================
# Granting deployment configurations access to the images in the tools project
# ===================================================================================
echo "Granting image-puller access from ${TEST_PROJECT_NAME}, to ${DEV_PROJECT_NAME} ..."

# allows test to pull images from dev
oc policy add-role-to-user \
system:image-puller \
system:serviceaccount:${TEST_PROJECT_NAME}:default \
-n ${DEV_PROJECT_NAME}

echo "Granting image-puller access from ${PROD_PROJECT_NAME}, to ${DEV_PROJECT_NAME} ..."

# allows prod to pull images from dev
oc policy add-role-to-user \
system:image-puller \
system:serviceaccount:${PROD_PROJECT_NAME}:default \
-n ${DEV_PROJECT_NAME}