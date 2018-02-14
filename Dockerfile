FROM node:8@sha256:28ab0eea1772d44259687f4d540535515f64634bae5ed846a12a09d5a49456f5
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
