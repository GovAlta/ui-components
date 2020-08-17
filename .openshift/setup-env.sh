#!/bin/bash
# unset all variables

# defaults
CREATE_TEST=0
CREATE_PROD=0
DRY_RUN=0

# display script name and purpose
echo -e "\n"
echo -e "\e[1;34mOpenShift NodeJS Project Creation Script\e[0m"
echo -e "--------------------------------------------------------------------------------"
echo -e "This script will help in creating the application environments used for deploying a NodeJS application with required resources.\n\nThis will create a dev environment at minimum and an optional test and prod environment with the appropriate flags." | fold -w 80 -s

# display arguments messages, help message and exit gracefully
if [[ "$#" -eq 0 ]]; then
  echo -e "\e[1;31m\nNo arguments supplied. Exiting...\e[0m"
  echo -e "\e[1;34m\nTo see a full ist of arguments, run $0 --help.\e[0m"
  exit 1
fi

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

# display all arguments
# echo "$@"

# check for required arguments, throw error if not supplied
# --name
if [[ ! $@ =~ "--name" ]]; then
  echo -e "\e[1;31m\nError: --name was not supplied. Exiting...\n\e[0m"
  exit 1
fi

# --git
if [[ ! $@ =~ "--git" ]]; then
  echo -e "\e[1;31m\nError: --git was not supplied. Exiting...\n\e[0m"
  exit 1
fi

# --ref
if [[ ! $@ =~ "--ref" ]]; then
  echo -e "\e[1;33m\nWarning: --ref was not supplied. Defaulting to master...\n\e[0m"
  SOURCE_REPOSITORY_REF=master
fi

# loop over all arguments, test and process them
while [[ "$#" -gt 0 ]]; do
  
  # start case
  case "$1" in
    # catches --name [arg]
    --name) 
      # shift to next argument
      shift 

      # ensure value is not empty
      if [ "$1" == "" ]; then echo -e "\e[1;31m\nError: --name is required.\e[0m" >&2; exit 1; fi
      NAME="$(echo "$1" | tr '[:upper:]' '[:lower:]')" # make lowercase
      ;;

    # catches --test [arg]
    --test) 
      CREATE_TEST=1
      ;;

    # catches --prod [arg]
    --prod) 
      CREATE_PROD=1
      ;;

    # catches --git [arg]
    --git)
      # shift to next argument
      shift
      
      # ensure value is not empty
      if [ "$1" == "" ]; then echo -e "\e[1;31m\nError: --git is required.\e[0m" >&2; exit 1; fi
      SOURCE_REPOSITORY_URI="$(echo "$1" | tr '[:upper:]' '[:lower:]')" # make lowercase
      ;;
    
    # catches --ref [arg]
    --ref)
      # shift to next argument
      shift

      # ensure value is not empty
      if [ "$1" == "" ]; then echo "\e[1;31m\nError: --ref is required.\e[0m" >&2; exit 1; fi
      SOURCE_REPOSITORY_REF="$1"
      ;;

    # catches --dry-run flag
    --dry-run)
      DRY_RUN=1
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

# log into to openshift
# get cluster address
read -p "Enter the OpenShift cluster url: " CLUSTER_URL

# get username
read -p "Username: " USERNAME

# get password
read -sp "Password: " PASSWORD

# log into OpenShift
echo -e "\n\nLogging into OpenShift @ ${CLUSTER_URL}"
oc login $CLUSTER_URL --username ${USERNAME} --password ${PASSWORD}

# run the initialize-projects script
# initialize-projects.sh
echo -e "\e[1;32mAll required arguments supplied. Initializing projects...\e[0m\n"
./create-projects.sh $NAME $CREATE_TEST $CREATE_PROD $DRY_RUN