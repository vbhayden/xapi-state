FROM node:8@sha256:2cd58f1e0ed6bcaa6db33e78a6aad275d323bd2d5a9cb74f9ad32deeb968a76a
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
