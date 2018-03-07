FROM node:8@sha256:0c7cd8a4a90f2b25a96635d77a30b5a6a689badf47419044649d051c15d2e4b7
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
