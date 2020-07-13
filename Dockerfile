FROM node:12-alpine3.9
ENV APP_DIR='/opt/ui-components'
WORKDIR $APP_DIR
ADD . .
RUN npm install -g @nrwl/cli
RUN yarn install
EXPOSE 8080
CMD npm run storybook