FROM node:8@sha256:7c8290a50527205b67f1ef743285d827eba2b3a726f4dedbd166175c7a39ed05
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
