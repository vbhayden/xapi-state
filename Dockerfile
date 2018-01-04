FROM node:8@sha256:14ce6bda461bf6785b2fef512196402f2adb7571511a4f3280058a9b2646176f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
