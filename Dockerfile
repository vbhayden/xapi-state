FROM node:8@sha256:eed4baca68436dcb5124579f05bdf8fc38d06328541502a0826d55ed8ef9295d
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
