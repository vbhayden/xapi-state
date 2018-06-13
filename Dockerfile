FROM node:8@sha256:98755b9281c251f9e712069978975181a9d9b43efcbe0f2270ff6206ebc86dda
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
