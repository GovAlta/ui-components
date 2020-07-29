pipeline {
  agent {
    node {
      label 'node12' 
    }
  }
  environment {
    AFFECTED_APPS = ''
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

        // TODO: cache dependencies
        
      }
    }
    stage('Test') {
      steps {
        sh 'nx affected --target=test --base=origin/dev --parallel'
      }
    } 
    stage('Lint') {
      steps {
        sh 'nx affected --target=lint --base=origin/dev --parallel'
      }
    } 
    stage('Build') {
      steps {
        sh 'npm run build:angular-storybook' //builds to /dist/storybook/angular-components
        sh 'npm run build:core-storybook' //builds to /dist/storybook/core-css
      }
    }
    stage('Deploy') {
      input {
        message 'Deploy?'
      }
      steps {
        //copy the nginx config to binary buld location
        sh 'cp /tmp/workspace/dio-sandbox/dio-sandbox-ui-components-pipeline/nginx.conf /tmp/workspace/dio-sandbox/dio-sandbox-ui-components-pipeline/dist/storybook'   
        dir('/tmp/workspace/dio-sandbox/dio-sandbox-ui-components-pipeline/dist/storybook') {
          sh 'oc start-build ui-components --from-dir . --follow'
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
