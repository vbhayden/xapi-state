FROM node:8@sha256:a308edc9e61e59459f53786774e78def560144eb6edd52bbd71ca1aeb5dd29f0
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
