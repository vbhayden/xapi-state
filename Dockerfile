FROM node:8@sha256:5afc7736a71bcf24281d9dbff878c771106e0791d56949b1a4e8d27c50424283
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
