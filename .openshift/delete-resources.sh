#!/bin/bash
NAME="${1}"

if [ -z "$NAME" ]; then
	echo "You must supply NAME."
	echo -n "Please enter the application name; for example 'ui-components': "
	read NAME
	NAME="$(echo "${NAME}" | tr '[:upper:]' '[:lower:]')"
	echo
fi

# ===========================================================================
# Delete project resources
# ===========================================================================

echo "Deleting existing '${NAME}' application resources ..."
oc delete all --selector app=$NAME
echo ""

echo "Deleting existing Jenkins persistent resources ..."
oc delete all --selector app=jenkins-persistent 
echo ""

echo "Deleting existing Jenkins Node12 builder resources ..."
oc delete all --selector app=jenkins-agent-node12
echo ""