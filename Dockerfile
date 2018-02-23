FROM node:8@sha256:8fb7c65f833f0630f1a4abe484e05b705036d50932222b9c1837efc08ba8c22d
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
