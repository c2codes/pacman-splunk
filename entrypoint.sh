#!/bin/bash

# Set the RUM deploymentEnvironment to the SPLUNK_SERVICE_ENVIRONMENT environment variable
sed -iE "s/deploymentEnvironment:\s*\"[^\"]*\"/deploymentEnvironment: \"${SPLUNK_RUM_ENVIRONMENT}\"/" /usr/src/app/public/index.html

# Set the RUM realm
sed -iE "s/realm:\s*\"[^\"]*\"/realm: \"${SPLUNK_RUM_REALM}\"/" /usr/src/app/public/index.html

# Set the RUM token
sed -iE "s/rumAccessToken:\s*\"[^\"]*\"/rumAccessToken: \"${SPLUNK_RUM_TOKEN}\"/" /usr/src/app/public/index.html