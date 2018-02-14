FROM node:8@sha256:c799471c57182bdb0501a1cc1bb9c0a945157279ad92c2d9db22b3b26b4cac85
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
