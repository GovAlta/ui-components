## About the Project
The project contains the GoA sample UI components for various frontend frameworks. Those injectable UI components could be uased as either templates or guidelines in development.

## Deployment
### OpenShift Deployment Key

|OpenShift Project|Key Name|
|---|---|
|DIO Sandbox|gitlab-core-ui-components|

### S2I Deployment
Application S2I Deployment
<pre>oc new-app https://gitlab.gov.ab.ca/dio/core/ui-components.git#Dev -source-secret='gitlab-core-ui-components'
</pre>