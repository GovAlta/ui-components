#!/bin/bash

# import all environment variables from CONFIG file
. CONFIG # equivalent to source ./CONFIG

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

# loop over all arguments, test and process them
while [[ "$#" -gt 0 ]]; do

  # start case
  case "$1" in
    # catches --test [arg]
    --test)
      CREATE_TEST=1
      ;;

    # catches --prod [arg]
    --prod)
      CREATE_PROD=1
      ;;

    # throws error when an unknown argument is passed in
    --*|*)
      echo "\e[1;31m\nError: The command line argument $1 is invalid.\e[0m" >&2;
      exit 1
      ;;

    # end case
    esac

    #shift to next argument
    shift
done

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
  echo -e "Test Namespace: $TEST_NAMESPACE";
fi

if [[ $CREATE_PROD == 0 ]]; then
  echo -e "Create Prod Namespace: No"
  else
  echo -e "Create Prod Namespace: Yes"
  echo -e "Prod Namespace: $PROD_NAMESPACE";
fi

echo -e "Source Repository URI: $SOURCE_REPOSITORY_URI"
echo -e "Source Repository Ref (tag/branch): $SOURCE_REPOSITORY_REF"

echo -e "Web Application Name: $WEB_APP_NAME"

echo -e "\n"

# log into to openshift
# get cluster address
read -p "Enter the OpenShift cluster url [$DEFAULT_CLUSTER_URI]: " CLUSTER_URL
CLUSTER_URL=${CLUSTER_URL:-$DEFAULT_CLUSTER_URI}

echo -e "Using $CLUSTER_URL as cluster url...\n"

# get username
read -p "Username: " USERNAME

# get password
read -sp "Password: " PASSWORD

# log into OpenShift
echo -e "\n\nLogging into OpenShift @ ${CLUSTER_URL}"
oc login $CLUSTER_URL --username ${USERNAME} --password ${PASSWORD}

# run the initialize-projects script
# initialize-projects.sh
echo -e "\n"
echo -e "\e[1;32mAll required arguments supplied. Initializing projects...\e[0m\n"
./create-projects.sh

# create project resources
./create-resources.sh

exit 0
