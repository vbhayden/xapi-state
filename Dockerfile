FROM node:8@sha256:9d3c5b6b15c9f82f4f668a7bf8348730ccfdca6a7fceddfcd5ef446f597c41f3
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
