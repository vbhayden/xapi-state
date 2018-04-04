FROM node:8@sha256:a4c4106ddda19c2c228cbdfbc0f0d7a5f27c383b0486f88fc2c2c40153763cf5
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
