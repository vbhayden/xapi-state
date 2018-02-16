FROM node:8@sha256:090e91ff2325ca4aa558771b7f24819825b5c8f520fb891723555bb48811f534
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
