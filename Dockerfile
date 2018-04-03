FROM node:8@sha256:8220ea2aa37785c435b45f4d83f8f5d1ceea5cd37936c0ff9d47b4d2a23db3cc
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
