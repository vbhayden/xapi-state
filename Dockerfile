FROM node:8@sha256:85e9188dece72bfd6df6f948c7c550be7028a9ccec7b52e06de44907574c4a66
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
