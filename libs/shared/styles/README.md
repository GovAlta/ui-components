# shared-styles

This library contains shared scss.  
CSS is compiled to dist by npm script build:styles.  The workspace.json for the project has a run-commands builder which calls the npm script and then copies the package.json to let dependent libraries detect that the build has finished.  

