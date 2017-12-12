FROM node:8@sha256:fb5551c916ffdf6b45073ec07c7045485491312f53a943f6bcb3a8c8bc953aee
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
