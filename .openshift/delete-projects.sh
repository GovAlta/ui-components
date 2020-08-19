#!/bin/bash

# import all environment variables from CONFIG file
. CONFIG # equivalent to source ./CONFIG

# delete projects
while true; do
<<<<<<< HEAD
  read -p $'\e[1;31m\nDelete project(s) created for this application?\e[0m [Y/n] ' answer
=======
  read -p $'\e[1;31m\nDelete project(s) created by this script?\e[0m [Y/n] ' answer
>>>>>>> 018fdc65a13882ac034ad877ecedc143c7af6a0d

  case $answer in
    [Yy]* )
      oc delete project "$DEV_NAMESPACE"

      if [ $CREATE_TEST == 1 ]; then
        oc delete project "$TEST_NAMESPACE"
      fi

      if [ $CREATE_PROD == 1 ]; then
        oc delete project "$PROD_NAMESPACE"
      fi
      break;;
    [Nn]* ) exit;;
    * ) echo "Please answer yes or no.";;
  esac
done
