FROM node:8@sha256:9fef54193f605eb77fcb7eaae564e7cc9b3444a12d76a2e1c87b9789752852b3
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
