FROM node:8@sha256:aa231490fa207f5d255007d3187a3b4e2671eb596837d84b5138505c0095267a
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
