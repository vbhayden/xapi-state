FROM node:8@sha256:f10c8218e3f92b513af9120f5eda5fed35b651343f940881d696b958cc16ab43
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
