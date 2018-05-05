FROM node:8@sha256:9ad3309f2ab60bb09774cc774ed305bfcda71dca65730ba49073b7269de1cac6
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
