#!/bin/bash

# import all environment variables from CONFIG file
. CONFIG # equivalent to source ./CONFIG

SCRIPT_DIR=$(dirname $0)
TEMPLATE_DIR="${SCRIPT_DIR}/templates"

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
  # echo "Granting edit access from ${DEV_NAMESPACE} to ${TEST_NAMESPACE} ..."
  # oc policy add-role-to-user system:edit system:serviceaccount:${DEV_NAMESPACE}:jenkins -n ${TEST_NAMESPACE}

  echo -e "\n"

  echo -e "\e[33mCreating '${TEST_NAMESPACE}' application resources...\e[0m"

  # process template file
  oc process -f ${TEMPLATE_DIR}/nginx-runtime-template.json -p NAME=${WEB_APP_NAME} | oc create -f -
  echo -e "\n"
fi

# create prod resources if CREATE_PROD = 1
if [[ $CREATE_PROD == 1 ]]; then
  echo -e "\e[32mCreating resources in ${PROD_NAMESPACE}...\e[0m"

  # change to test project
  oc project ${PROD_NAMESPACE}
  echo -e "\n"

  # grant image-puller access from prod to dev
  # echo "Granting edit access from ${DEV_NAMESPACE} to ${PROD_NAMESPACE} ..."
  # oc policy add-role-to-user system:edit system:serviceaccount:${DEV_NAMESPACE}:jenkins -n ${PROD_NAMESPACE}

  echo -e "\n"

  echo -e "\e[33mCreating '${PROD_NAMESPACE}' application resources...\e[0m"

  # process template file
  oc process -f ${TEMPLATE_DIR}/nginx-runtime-template.json -p NAME=${WEB_APP_NAME} | oc create -f -

  echo -e "\n"
fi
