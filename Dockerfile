FROM node:8@sha256:cd7d53e0bd8983ebee507b1e050c0dc6738bf20ea1eb7e39b9b5a4febd7f3e8c
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
