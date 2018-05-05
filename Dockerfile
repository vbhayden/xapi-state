FROM node:8@sha256:8017cc305f60bf249459f2e0f167da153a7c9d12d0d64efeb20264bc797f4e52
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
