FROM node:8@sha256:c55f3e9a7a2b9194e8c8c6b68b182caac02d0f6a77aacba1ebd73f6001a1c381
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
