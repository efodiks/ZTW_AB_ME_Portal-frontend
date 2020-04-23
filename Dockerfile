# Select the image to use
FROM node

WORKDIR ./app

COPY public ./public
COPY src ./src
COPY package.json package-lock.json ./

RUN npm install && npm run build

RUN npm install -g serve

ENTRYPOINT ["serve","-s","build"]

EXPOSE 5000
