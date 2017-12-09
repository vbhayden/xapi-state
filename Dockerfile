FROM node:8@sha256:875386ab739c563e9ae499643adbc4c49afdcab8da05d800c5ae00dba9a98eb7
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
