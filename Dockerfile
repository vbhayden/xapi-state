FROM node:8@sha256:6d6c00a85a9859339f38eeace91b1f5554e7c7cf1165d3517cff991bf798ee2f
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
