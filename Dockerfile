FROM node:8@sha256:b802a02ee6496c34e2dc0eb0379eb1c738331414956d650c0dffdfa0866acb2f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
