FROM node:8@sha256:1f37c728954dacf65b62febc3ae8bbbf5f8f3f5874f5bf303ed60e16d9acbb61
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
