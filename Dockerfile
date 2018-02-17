FROM node:8@sha256:30627901c9b8b73d51468ed66ac72c6235012b30977df237d20ac64f814aa437
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
