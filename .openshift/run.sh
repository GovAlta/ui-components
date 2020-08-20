#!/bin/bash

# import all environment variables from CONFIG file
. CONFIG # equivalent to source ./CONFIG

unset SOURCE_SECRET_NAME
unset SOURCE_SECRET_PASSWORD

CLUSTER_URL={$DEFAULT_CLUSTER_URI}

# display script name and purpose
echo -e "\n"
echo -e "\e[1;34mOpenShift NodeJS Project Creation Script\e[0m"
echo -e "--------------------------------------------------------------------------------"
echo -e "This script will help in creating the application environments used for deploying a NodeJS application with required resources.\n\nThis will create a dev environment at minimum and an optional test and prod environment with the appropriate flags." | fold -w 80 -s

# display help documentation if --help is supplied
if [[ "$#" -eq 1 ]]; then
  if [ "$1" == "--help" ]; then
    # TODO: create help documentation
    echo "--------------------------------------------------------------------------------"
    echo "TODO: Need to write help documentation."
    echo "--------------------------------------------------------------------------------"
    exit 0
  fi
fi

# echo variables
echo -e "\n"
echo -e "\e[1;32mUsing Following Environment Variables...\e[0m"
echo -e "OpenShift Cluster: $DEFAULT_CLUSTER_URI"

echo -e "Base Namespace: $BASE_NAMESPACE"

echo -e "Dev Namespace: $DEV_NAMESPACE"

if [[ $CREATE_TEST == 0 ]]; then
  echo -e "Create Test Namespace: No"
else
  echo -e "Create Test Namespace: Yes"
  echo -e "Test Namespace: $TEST_NAMESPACE"
fi

if [[ $CREATE_PROD == 0 ]]; then
  echo -e "Create Prod Namespace: No"
else
  echo -e "Create Prod Namespace: Yes"
  echo -e "Prod Namespace: $PROD_NAMESPACE"
fi

echo -e "Source Repository URI: $SOURCE_REPOSITORY_URI"
echo -e "Source Repository Ref (tag/branch): $SOURCE_REPOSITORY_REF"

echo -e "Web Application Name: $WEB_APP_NAME"

echo -e "\n"

# log into to openshift
# get cluster address
read -p "$(echo -e "\e[1;33mEnter the OpenShift cluster url (Press Enter for Default Cluster URI): \e[0m")" CLUSTER_URL
CLUSTER_URL=${CLUSTER_URL:-$DEFAULT_CLUSTER_URI}

echo -e "Using $CLUSTER_URL as cluster url..."
echo -e "\n"

# get username
read -p $'\e[1;33mOpenShift Username: \e[0m' USERNAME

# get password
read -sp $'\e[1;33mOpenShift Password: \e[0m' PASSWORD

# # get source secret username
# read -p $'\e[1;33mEnter the source secret name: \e[0m' SOURCE_SECRET_NAME

# # source secret password
# read -p $'\e[1;33mEnter the source secret password: \e[0m' SOURCE_SECRET_PASSWORD

# log into OpenShift
echo -e "\n\n\e[1;32mLogging into OpenShift @ ${CLUSTER_URL}\e[0m"
oc login $CLUSTER_URL --username ${USERNAME} --password ${PASSWORD}

# run the initialize-projects script
# initialize-projects.sh
./create-projects.sh

# create project resources
# will create: deployment config, route, service, build config (pipeline), source secret (WIP)
./create-resources.sh ${SOURCE_SECRET_NAME} ${SOURCE_SECRET_PASSWORD}

echo -e "\n\n\e[1;33mNOTE:\e[0m \e[33mYou will need to manually create a \"Source Secret\" in the OpenShift web console for the ${DEV_NAMESPACE} project." \
  "\n\nWhen the secret is created you will need to manually set it as the \"Source Secret\" for the \"${WEB_APP_NAME}-build-pipline\" resource." \
  "\n\nYou will need to manually start the pipeline build process.\e[0m" | fold -w 80 -s

echo -e "\n"

exit 0
