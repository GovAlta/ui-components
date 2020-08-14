#!/bin/bash
SCRIPT_DIR=$(dirname $0)
TEMPLATE_DIR="${SCRIPT_DIR}/templates"
DEBUG=0

# Input parameters
NAME="${1}"
SOURCE_REPOSITORY_URL="${2}"
SOURCE_REPOSITORY_REF="${3}"
#SOURCE_SECRET="${4}"

if [ -z "$NAME" ]; then
	echo "You must supply NAME."
	echo -n "Please enter the application name; for example 'ui-components': "
	read NAME
	NAME="$(echo "${NAME}" | tr '[:upper:]' '[:lower:]')"
	echo
fi

if [ -z "$SOURCE_REPOSITORY_URL" ]; then
	echo "You must supply SOURCE_REPOSITORY_URL."
	echo -n "Please enter the git repository uri; for example 'git@gitlab.gov.ab.ca:dio/core/ui-components.git' (This will depend on the kind of secret you are using.): "
	read SOURCE_REPOSITORY_URL
	SOURCE_REPOSITORY_URL="$(echo "${SOURCE_REPOSITORY_URL}")"
	echo
fi

if [ -z "$SOURCE_REPOSITORY_REF" ]; then
	echo "You must supply SOURCE_REPOSITORY_REF."
	echo -n "Please enter the git repository ref (branch); for example 'master': "
	read SOURCE_REPOSITORY_REF
	SOURCE_REPOSITORY_REF="$(echo "${SOURCE_REPOSITORY_REF}")"
	echo
fi

# if [ -z "$SOURCE_SECRET" ]; then
# 	echo "You must supply SOURCE_SECRET."
# 	echo -n "Please enter the source secret created in OpenShift"
# 	read SOURCE_SECRET
# 	SOURCE_SECRET="$(echo "${SOURCE_SECRET}")"
# 	echo
# fi

#===============================================================================
# Creating project resources
#-------------------------------------------------------------------------------

if [ ${DEBUG} == 1 ]; then
  echo "DEBUG is on"

  echo ${NAME} ${SOURCE_REPOSITORY_URL} ${SOURCE_REPOSITORY_REF} #${SOURCE_SECRET}
fi

# DEV Resources
if [ ${DEBUG} == 0 ]; then
  echo "Creating Jenkins persistent resources ..."
  oc process -f ${TEMPLATE_DIR}/jenkins-persistent-template.json | oc create -f -
  echo ""

  echo "Creating Jenkins Node12 agent resources ..."
  oc process -f ${TEMPLATE_DIR}/jenkins-agent-node12-template.json | oc create -f -
  echo ""

  echo "Creating '${NAME}' application resources ..."
  oc process -f ${TEMPLATE_DIR}/nginx-runtime-template.json -p NAME=${NAME} | oc create -f -
  echo ""

  echo "Creating '${NAME}' build pipeline resource ..."
  oc process -f ${TEMPLATE_DIR}/jenkins-build-pipeline-template.json -p NAME=${NAME} -p SOURCE_REPOSITORY_URL=${SOURCE_REPOSITORY_URL} -p SOURCE_REPOSITORY_REF=${SOURCE_REPOSITORY_REF} #-p SOURCE_SECRET=${SOURCE_SECRET} | oc create -f -
fi

# TEST Resources

echo ""
echo "Done creating project resources"