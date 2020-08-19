#!/bin/bash

# import all environment variables from CONFIG file
. CONFIG # equivalent to source ./CONFIG

SCRIPT_DIR=$(dirname $0)
TEMPLATE_DIR="${SCRIPT_DIR}/templates"
<<<<<<< HEAD
# SOURCE_SECRET_NAME="${1}"
# SOURCE_SECRET_PASSWORD="${2}"

# create dev project resources
echo -e "\n\e[1;32mCreating resources in ${DEV_NAMESPACE}...\e[0m"

# create http basic auth secret in *-dev project
# this script will not work with SSH based source code repository URIs
# TODO: get automated screts working
# get source secret params
#echo -e "\e[1;32mCreating Source Secret...\e[0m"
# TODO: add logic to create the appropriate secret based on repository URI type
# oc create secret generic ${SOURCE_SECRET_NAME} --from-literal=username=${SOURCE_SECRET_NAME} --from-literal=password=${SOURCE_SECRET_PASSWORD} --type=kubernetes.ui/basic-auth -n ${DEV_NAMESPACE}

# set build secret on pipeline
# this is needed for the build configuration to accept previously created source secret
# echo -e "\e[1;Linking Source Secret to builder account...\e[0m"
# oc secrets link builder ${SOURCE_SECRET_NAME}
# oc set build-secret --source bc/${WEB_APP_NAME}-build-pipeline ${SOURCE_SECRET_NAME}

# change to dev project
echo -e "\n\e[1;32mSwtiching to ${DEV_NAMESPACE} project...\e[0m"
oc project ${DEV_NAMESPACE}

echo -e "\n\e[1;32mCreating Jenkins persistent resources...\e[0m"
oc process -f ${TEMPLATE_DIR}/jenkins-persistent-template-dev.json | oc create -f -

echo -e "\n\e[1;32mCreating Jenkins Node12 agent resources...\e[0m"
oc process -f ${TEMPLATE_DIR}/jenkins-agent-node12-template-dev.json | oc create -f -

echo -e "\n\e[1;32mCreating '${DEV_NAMESPACE}' application resources...\e[0m"
oc process -f ${TEMPLATE_DIR}/nginx-runtime-template.json -p NAME=${WEB_APP_NAME} | oc create -f -

echo -e "\n\e[1;32mCreating '${DEV_NAMESPACE}' build pipeline resource...\e[0m"
oc process -f ${TEMPLATE_DIR}/jenkins-build-pipeline-template-dev.json -p NAME=${WEB_APP_NAME} -p SOURCE_REPOSITORY_URI=${SOURCE_REPOSITORY_URI} -p SOURCE_REPOSITORY_REF=${SOURCE_REPOSITORY_REF} | oc create -f -

# create test resources if CREATE_TEST = 1
if [[ $CREATE_TEST == 1 ]]; then
  echo -e "\n\e[1;32m\nCreating resources in ${TEST_NAMESPACE}...\e[0m"

  # change to test project
  oc project ${TEST_NAMESPACE}

  # grant image-puller access from prod to dev
  echo -e "\n\e[1;32m\nGranting edit access from ${DEV_NAMESPACE} to ${TEST_NAMESPACE}...\e[0m"
  oc policy add-role-to-user edit system:serviceaccount:${DEV_NAMESPACE}:jenkins -n ${TEST_NAMESPACE}

  echo -e "\n\e[1;32m\nCreating '${TEST_NAMESPACE}' application resources...\e[0m"

  # process template file
  oc process -f ${TEMPLATE_DIR}/nginx-runtime-template.json -p NAME=${WEB_APP_NAME} | oc create -f -
=======

# create dev project resources
echo -e "\n"
echo -e "\e[32mCreating resources in ${DEV_NAMESPACE}...\e[0m"

# change to test project
oc project ${DEV_NAMESPACE}
echo -e "\n"

echo -e "\e[33mCreating Jenkins persistent resources...\e[0m"
oc process -f ${TEMPLATE_DIR}/jenkins-persistent-template-dev.json | oc create -f -
echo -e "\n"

echo -e "\e[33mCreating Jenkins Node12 agent resources...\e[0m"
oc process -f ${TEMPLATE_DIR}/jenkins-agent-node12-template-dev.json | oc create -f -
echo -e "\n"

echo -e "\e[33mCreating '${DEV_NAMESPACE}' application resources...\e[0m"
oc process -f ${TEMPLATE_DIR}/nginx-runtime-template.json -p NAME=${WEB_APP_NAME} | oc create -f -
echo -e "\n"

echo -e "\e[33mCreating '${DEV_NAMESPACE}' build pipeline resource...\e[0m"
oc process -f ${TEMPLATE_DIR}/jenkins-build-pipeline-template-dev.json -p NAME=${WEB_APP_NAME} -p SOURCE_REPOSITORY_URI=${SOURCE_REPOSITORY_URI} -p SOURCE_REPOSITORY_REF=${SOURCE_REPOSITORY_REF} | oc create -f -
echo -e "\n"

# create test resources if CREATE_TEST = 1
if [[ $CREATE_TEST == 1 ]]; then
  echo -e "\e[32mCreating resources in ${TEST_NAMESPACE}...\e[0m"

  # change to test project
  oc project ${TEST_NAMESPACE}
  echo -e "\n"

  # grant image-puller access from prod to dev
  echo "Granting edit access from ${DEV_NAMESPACE} to ${TEST_NAMESPACE} ..."
  oc policy add-role-to-user edit system:serviceaccount:${DEV_NAMESPACE}:jenkins -n ${TEST_NAMESPACE}

  echo -e "\n"

  echo -e "\e[33mCreating '${TEST_NAMESPACE}' application resources...\e[0m"

  # process template file
  oc process -f ${TEMPLATE_DIR}/nginx-runtime-template.json -p NAME=${WEB_APP_NAME} | oc create -f -
  echo -e "\n"
>>>>>>> 018fdc65a13882ac034ad877ecedc143c7af6a0d
fi

# create prod resources if CREATE_PROD = 1
if [[ $CREATE_PROD == 1 ]]; then
<<<<<<< HEAD
  echo -e "\n\e[1;32m\nCreating resources in ${PROD_NAMESPACE}...\e[0m"

  # change to test project
  oc project ${PROD_NAMESPACE}

  # grant image-puller access from prod to dev
  echo -e "\n\e[1;32m\nGranting edit access from ${DEV_NAMESPACE} to ${PROD_NAMESPACE}...\e[0m"
  oc policy add-role-to-user edit system:serviceaccount:${DEV_NAMESPACE}:jenkins -n ${PROD_NAMESPACE}

  echo -e "\n\e[1;32m\nCreating '${PROD_NAMESPACE}' application resources...\e[0m"

  # process template file
  oc process -f ${TEMPLATE_DIR}/nginx-runtime-template.json -p NAME=${WEB_APP_NAME} | oc create -f -
=======
  echo -e "\e[32mCreating resources in ${PROD_NAMESPACE}...\e[0m"

  # change to test project
  oc project ${PROD_NAMESPACE}
  echo -e "\n"

  # grant image-puller access from prod to dev
  echo "Granting edit access from ${DEV_NAMESPACE} to ${PROD_NAMESPACE} ..."
  oc policy add-role-to-user edit system:serviceaccount:${DEV_NAMESPACE}:jenkins -n ${PROD_NAMESPACE}

  echo -e "\n"

  echo -e "\e[33mCreating '${PROD_NAMESPACE}' application resources...\e[0m"

  # process template file
  oc process -f ${TEMPLATE_DIR}/nginx-runtime-template.json -p NAME=${WEB_APP_NAME} | oc create -f -

  echo -e "\n"
>>>>>>> 018fdc65a13882ac034ad877ecedc143c7af6a0d
fi
