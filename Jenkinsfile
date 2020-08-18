def publishNpm = false
def deployStorybook = true
def templateName = 'ui-components'

pipeline {
  agent {
    node {
      label 'node12'
    }
  }
  environment {
    AFFECTED_APPS = ''
  }
  // options {
  //   // set a timeout of 20 minutes for this pipeline
  //   timeout(time: 20, unit: 'MINUTES')
  // }
  //test image pull
  stages {
    stage("Pull Image") {
      steps {
        sh 'oc tag web-dev/ui-components:latest web-test/ui-components:latest'
      }
    }
  }
  /*
  stages {
    stage('Prepare') {
      steps {
        checkout scm
        sh 'npm install -g @nrwl/cli'
        sh 'npm install'
        // script {
        //   def affected = sh (
        //     script: 'nx affected:libs --base=${GIT_PREVIOUS_SUCCESSFUL_COMMIT} --plain',
        //     returnStdout: true
        //   ).trim()
        //   def isStoryBookOnly = affected == 'storybook-common'
        //   echo "affected: '${affected}'"
        //   if (isStoryBookOnly == false) {
        //     publishNpm = true
        //   }

        //   if (affected.length() > 0) {
        //     deployStorybook = true
        //   }
        //}
      // TODO: cache dependencies
      }
    }
    stage('Test') {
        steps {
          // sh 'nx affected --target=test --base=origin/dev~1 --head=origin/dev --parallel'
          sh 'nx run-many --target=test --projects=angular-components'
        }
    }
    stage('Lint') {
      steps {
        // sh 'nx affected --target=lint --base=origin/dev~1 --head=origin/dev --parallel'
        sh 'nx run-many --target=lint --projects=angular-components'
      }
    }
    stage('Build storybook') {
        when {
        expression { deployStorybook == true }
        }
      steps {
        sh 'npm run build:angular-storybook' //builds to /dist/storybook/angular-components
        sh 'npm run build:core-storybook' //builds to /dist/storybook/core-css
      }
    }
    stage('Build npm package') {
      when {
        expression { publishNpm == true }
      }
      steps {
        sh 'npm run build:angular-components'
        sh 'npm run build:core-css'
      }
    }
    stage('Deploy Test') {
      parallel {
        stage('Storybook') {
          when {
            expression { deployStorybook == true }
          }
          steps {
            //copy the nginx config to binary buld location
            sh 'cp nginx.conf dist/storybook'
            dir('dist/storybook') {
              sh 'oc start-build ui-components --from-dir . --follow'
            }
          }
        }
        stage('Push Image to Test'){
          steps {
            // TODO: make this dynamic
            sh 'oc tag web-dev/ui-components:latest web-test/ui-components:latest'
          }
        }
        stage('Publish to npm') {
          when {
            expression { publishNpm == true }
          }
          steps {
            sh 'npm run publish:angular-components -- --dry-run'
            sh 'npm run publish:core-css -- --dry-run'
          }
        }
      }
    }
  }
  */
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
