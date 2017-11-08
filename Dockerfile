FROM node:8@sha256:ae75ba3568f2c3d93b0952bd1a1888434bbd6e2ea8c907aa57836958be688cef
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
