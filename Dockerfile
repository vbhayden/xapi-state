FROM node:8@sha256:89171382ea2e08a7ca84f653cd37e30e47b9c305baaee272899e25c912172f26
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
