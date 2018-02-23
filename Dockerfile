FROM node:8@sha256:928fce603096ea16a594c3d420e3a8c4680307ae88a2a20633585d10628fc2c5
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
