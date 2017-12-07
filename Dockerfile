FROM node:8@sha256:cc738a92ef939e0b746ab88cde834764f1d4a150122dfa3a71fd63faad1d0633
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
