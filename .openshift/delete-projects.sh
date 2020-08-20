#!/bin/bash

# import all environment variables from CONFIG file
. CONFIG # equivalent to source ./CONFIG

# delete projects
while true; do
  echo -e "\e[1;31mWarning! You are about to delete the following projects:\e[0m\n"
  echo -e "$DEV_NAMESPACE"
  if [ $CREATE_TEST == 1 ]; then echo -e "$TEST_NAMESPACE"; fi
  if [ $CREATE_PROD == 1 ]; then echo -e "$PROD_NAMESPACE"; fi

  read -p $'\e[1;33m\nDelete project(s) created for this application?\e[0m [Y/n] ' answer

  case $answer in
  [Yy]*)
    oc delete project "$DEV_NAMESPACE"

    if [ $CREATE_TEST == 1 ]; then
      oc delete project "$TEST_NAMESPACE"
    fi

    if [ $CREATE_PROD == 1 ]; then
      oc delete project "$PROD_NAMESPACE"
    fi
    break
    ;;
  [Nn]*) exit ;;
  *) echo "Please answer yes or no." ;;
  esac
done
