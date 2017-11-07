FROM node:8@sha256:98472582f910ab3ed91debed2e85762161b7fcd12bef7e69006d7d585429a53a
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
