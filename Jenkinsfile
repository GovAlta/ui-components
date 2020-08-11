def publishNpm = false
def deployStorybook = false;
def base = '';
def baseCommand = ''
def generateNpmrc(){
	sh "echo \"@abgov:registry=https://registry.npmjs.org/\" >> ~/.npmrc"
	
	sh "echo \"//registry.npmjs.org/:_authToken=21d6856c-6376-4f64-a27e-6533bd4bc8c7\" > ~/.npmrc"
}


pipeline {
  agent {
    node {
      label 'node12' 
    }
  }
  options {
    // set a timeout of 20 minutes for this pipeline
    timeout(time: 20, unit: 'MINUTES')
  }
  stages {
    stage('Prepare') {
      steps {
        checkout scm
        sh 'npm install -g @nrwl/cli'
        sh 'npm install'
        script {
          if (env.GIT_PREVIOUS_SUCCESSFUL_COMMIT){
            baseCommand = "--base=${GIT_PREVIOUS_SUCCESSFUL_COMMIT}"
          }
          else {
            baseCommand = "--all"
          }
          
          def affected = sh (
            script: "nx affected:libs ${baseCommand} --plain",
            returnStdout: true
          ).trim();
          def isStoryBookOnly = affected == 'storybook-common';
          echo "affected: '${affected}'"
          if (isStoryBookOnly == false){
            publishNpm = true;
          }

          if (affected.length() > 0){
            deployStorybook = true;
          }
        }
        // TODO: cache dependencies
        
      }
    }
    stage('Build Processes') {
      parallel {
        stage('Test'){
          steps {
            sh "nx affected --target=test ${baseCommand} --parallel"
          }
        }
        stage('Lint'){
          steps {
            sh "nx affected --target=lint ${baseCommand} --parallel"
          }
        }
        stage('Build storybook'){
           when {
            expression { deployStorybook == true }
          }
          steps {
            sh 'npm run build:angular-storybook' //builds to /dist/storybook/angular-components
            sh 'npm run build:core-storybook' //builds to /dist/storybook/core-css
            sh 'npm run build:vue-storybook' //builds to /dist/storybook/vue-components
          }
        }
        stage('Build npm package'){
          when {
            expression { publishNpm == true }
          }
          steps {
            sh "nx affected --target=build ${baseCommand} --parallel --prod"
          }
        }
      }
    }
    stage('Deploy Test') {
      parallel {
        stage('Storybook'){
          when {
            expression { deployStorybook == true }
          }
          steps {
            //copy the nginx config to binary buld location
            sh "cp nginx.conf dist/storybook"   
            dir('dist/storybook') {
              sh "oc start-build ui-components --from-dir . --follow"
            }
          }
        }
        stage('Publish to npm'){
          when {
            expression { publishNpm == true }
          }
          steps {
            sh "npm run publish:npm-test"
          }
        }
      }
    }

    stage('Deploy Prod') {
      parallel {
        stage('Storybook'){
          when {
            expression { deployStorybook == true }
          }
          steps {
            echo 'placeholder'
          }
        }
        stage('Publish to npm'){
          when {
            expression { publishNpm == true }
          }
          steps {
            generateNpmrc()
            sh 'npm run publish:npm'
          }
        }
      }
    }
  }
}

// Leaving this in to refer to it should we want to use OpenShift specific
// commands as this allows to use OpenShift name refernces and use of variables
// for subsequent steps.
// def templateName = "ui-components-pipeline"
// pipeline {
//   agent {
//     node {
//       label "node12"
//     }
//   }
//   options {
//     timeout(time: 20, unit: 'MINUTES')
//   }
//   stages {
//     stage('preamble') {
//       steps {
//         script {
//           openshift.withCluster() {
//             openshiftwithProject() {
//               echo "Using project: ${openshift.project()}"
//             }
//           }
//         }
//       }
//     }
//     stage('build') {
//       steps {
//         script {
//           openshift.withCluster() {
//             openshift.withProject() {
//               def builds = openshift.selector("bc", templateName).related('builds')
//               timeout(5) { 
//                 build.untilEach(1) {
//                   return (it.object().status.phase == "Complete")
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     stage('deploy') {
//       steps {
//         script {
//           openshift.withCluster() {
//             openshift.withProject() {
//               def rm = openshift.selector("dc", templateName).rollout().latest()
//               timeout(5) {
//                 openshift.selector("dc", templateName).related('pods').untilEach(1) {
//                   return (it.object().status.phase == "Running")
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//     stage('tag') {
//       steps {
//         script {
//           openshift.withCluster() {
//             openshiftwithProject() {
//               openshift.tag("${templateName}:latest", "${templateName-staging}:latest")
//             }
//           }
//         }
//       }
//     }
//   }
// }

    // stage("Build Application") {
    //   when {
    //     expression { return AFFECTED_APPS }
    //   }
    //   steps {
    //     script {
    //       openshift.withCluster() {
    //         openshift.withProject() {
    //           AFFECTED_APPS.each { affected ->
    //             def bc = openshift.selector("bc", "${affected}-builder")
    //             if ( !bc.exists() ) {
    //               bc = openshift.selector("bc", affected)
    //             }
                
    //             if ( bc.exists() ) {
    //               bc.startBuild()
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //}
  //}
//}
