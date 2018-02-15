FROM node:8@sha256:9f4efebdb42aa2c0eb752830a6ce57ff73afa7ee19b24804d32bf3e1252b4b72
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
