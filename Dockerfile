FROM node:8@sha256:4fe84bf04ebb3da3ff5e6524db3dd5085eb3c61a85928b594924aae8529f376f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
