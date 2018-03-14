FROM node:8@sha256:5c52c5f4deac879e4be47ae07e4271c16a449280337d8830064464b286d011a8
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
