FROM node:8@sha256:dab558291fb7292ff352cc63f1cbde23e03b69e1fb9abf96e056d591e8a89570
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
