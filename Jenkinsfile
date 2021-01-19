def publishNpm = false;
def deployStorybook = false;
def baseCommand = '--all';
def ocProject = 'ui-components-dev';

pipeline {
  agent {
    node {
      label 'node12'
    }
  }
  options {
    timeout(time: 3, unit: 'HOURS')
  }
  stages {
    stage('Prepare') {
      steps {
        checkout scm
        sh 'npm install'
        script {
          if (env.GIT_PREVIOUS_SUCCESSFUL_COMMIT){
            baseCommand = "--base=${GIT_PREVIOUS_SUCCESSFUL_COMMIT}"
          }

          def affected = sh (
            script: "npx nx affected:libs ${baseCommand} --plain",
            returnStdout: true
          ).trim();
          echo "affected: '${affected}'"

          if (affected.length() > 0){
            def isStoryBookOnly = affected == 'shared-storybook-common';
            deployStorybook = true;
            if (isStoryBookOnly == false){
              publishNpm = true;
            }
          }

          echo "deployStorybook: '${deployStorybook}'"
          echo "publishNpm: '${publishNpm}'"
        }
      }
    }
    stage('Build') {
      stages {
        stage('Test'){
          steps {
            sh "npx nx affected --target=test ${baseCommand} --parallel"
          }
        }
        stage('Lint'){
          steps {
            sh "npx nx affected --target=lint ${baseCommand} --parallel"
          }
        }
        stage('Build storybook'){
           when {
            expression { deployStorybook == true }
          }
          steps {
            sh 'npm run build:angular-storybook' //builds to /dist/storybook/angular-components
            sh 'npm run build:core-storybook' //builds to /dist/storybook/core-css
            sh 'npm run build:angular-storybook' //builds to /dist/storybook/angular-components
            sh 'npm run build:angular-material-storybook' //builds to /dist/storybook/angular-components
            sh 'npm run build:vue-storybook' //builds to /dist/storybook/vue-components
            sh 'npm run build:react-storybook' //builds to /dist/storybook/react-components
            //copy the nginx config to binary buld location
            sh 'cp nginx.conf dist/storybook'
            script {
              openshift.withCluster() {
                openshift.withProject(ocProject) {
                  def bc = openshift.selector('bc', 'ui-components')
                  bc.startBuild('--from-dir=dist/storybook', '--wait', '--follow')
                }
              }
            }
          }
        }
        stage('Build npm package'){
          when {
            expression { publishNpm == true }
          }
          steps {
            sh "npx nx affected --target=build ${baseCommand} --parallel --prod --with-deps"
            sh "npx nx affected --target=post ${baseCommand} --parallel"
          }
        }
      }
    }
    stage('Deploy Dev') {
      stages {
        stage('Storybook'){
          when {
            expression { deployStorybook == true }
          }
          steps {
            script {
              openshift.withCluster() {
                openshift.withProject(ocProject) {
                  openshift.tag('ui-components:latest', 'ui-components:dev') 
                }
              }
            }
            script {
              openshift.withCluster() {
                openshift.withProject(ocProject) {
                  def dc = openshift.selector('dc', 'ui-components')
                  def rm = dc.rollout()
                  rm.latest()
                  rm.status()
                }
              }
            }
          }
        }
      }
      post {
        success {
          slackSend (
            color: 'good', 
            message: "UI Components pipeline build ${env.BUILD_NUMBER} ready for promotion to Test: ${env.BUILD_URL}"
          )
        }
      }
    }
    stage('Deploy Test') {
      input{
        message 'Promote to Test?'
        ok 'Yes'
      }
      parallel {
        stage('Storybook'){
          when {
            expression { deployStorybook == true }
          }
          steps {
            script {
              openshift.withCluster() {
                openshift.withProject(ocProject) {
                  openshift.tag('ui-components:dev', 'ui-components:test') 
                }
              }
            }
            script {
              openshift.withCluster() {
                openshift.withProject('ui-components-test') {
                  def dc = openshift.selector('dc', 'ui-components')
                  def rm = dc.rollout()
                  rm.latest()
                  rm.status()
                }
              }
            }
          }
        }
        stage('Publish to npm'){
          when {
            expression { publishNpm == true }
          }
          steps {
            sh 'npm run semantic-delivery -- --dry-run'
          }
        }
      }
      post {
        success {
          slackSend (
            color: 'good', 
            message: "UI Components pipeline build ${env.BUILD_NUMBER} ready for promotion to Production: ${env.BUILD_URL}"
          )
        }
      }
    }
    stage('Deploy Prod') {
      input{
        message 'Promote to Production and Publish Libraries?'
        ok 'Yes'
      }
      parallel {
        stage('Storybook'){
          when {
            expression { deployStorybook == true }
          }
          steps {
            script {
              openshift.withCluster() {
                openshift.withProject(ocProject) {
                  openshift.tag('ui-components:test', 'ui-components:prod') 
                }
              }
            }
            script {
              openshift.withCluster() {
                openshift.withProject('ui-components-prod') {
                  def dc = openshift.selector('dc', 'ui-components')
                  def rm = dc.rollout()
                  rm.latest()
                  rm.status()
                }
              }
            }
          }
        }
        stage('Publish to npm'){
          when {
            expression { publishNpm == true }
          }
          environment { 
            PUBLISH_GITLAB_TOKEN = credentials('ui-components-dev-lib-publish-gitlab-token')
            PUBLISH_NPM_TOKEN = credentials('ui-components-dev-lib-publish-npm-token')
          }
          steps {
            sh "npm run semantic-delivery -- --token ${PUBLISH_GITLAB_TOKEN}"
            sh "env NPM_TOKEN=${PUBLISH_NPM_TOKEN} npm run publish:npm"
          }
        }
      }
    }
  }
  post {
    success {
      slackSend color: 'good', message: 'UI Components pipeline build ${env.BUILD_NUMBER} Completed.'
    }
    failure { 
      slackSend color: 'bad', message: 'UI Components pipeline build ${env.BUILD_NUMBER} Failed: ${env.BUILD_URL}'
    }
  }
}
