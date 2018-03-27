FROM node:8@sha256:d1a97c68e06df6ab34974996fe5479d417316c97d6b333704453fac3549cc08f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
