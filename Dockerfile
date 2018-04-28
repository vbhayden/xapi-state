FROM node:8@sha256:7c3a236a4f4b61c1e390930225209ddc24d3d9a08a0dee97d13fff2df91c1cf7
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
