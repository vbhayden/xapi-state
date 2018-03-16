FROM node:8@sha256:7817307d55cd400beba896d051dc5324f1c02bf20daefb13e239c4423c8c2207
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
