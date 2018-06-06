FROM node:8@sha256:321655aeb195b7946e9a29d28453388751389e8ced66b4dea772ae76a6985309
ENV NPM_CONFIG_LOGLEVEL warn
WORKDIR /usr/src/app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install --production
RUN npm prune
COPY dist dist

EXPOSE 80
CMD ["npm", "start"]
