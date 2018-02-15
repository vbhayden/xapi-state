FROM node:8@sha256:2bc11676ad168f25e38e123672a0e5a782d148cf3b0b77328d971ed1b06e4104
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
