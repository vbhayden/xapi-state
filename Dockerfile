FROM node:8@sha256:3c0dad06d2c8698df70fc692675712cd8862e52078bc9a40e6775c5c15877918
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
