FROM node:8@sha256:fcbb07b509e1d9a4fa76b89762fed90cf043fd603faf3a8ba3937ac099135112
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
