FROM node:8@sha256:8b62fd99341bd457d197b786e935e048da1c46ef47a505bd49c6d63cd469d3d1
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
