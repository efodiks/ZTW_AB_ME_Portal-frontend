FROM node

WORKDIR ./app

#set up build args
ARG REACT_APP_CLOUD_NAME
ARG REACT_APP_CLOUD_FOLDER
ARG REACT_APP_CLOUD_PRESET

#set up build env
ENV REACT_APP_CLOUD_NAME $REACT_APP_CLOUD_NAME
ENV REACT_APP_CLOUD_FOLDER $REACT_APP_CLOUD_FOLDER
ENV REACT_APP_CLOUD_PRESET $REACT_APP_CLOUD_PRESET

#copy package.json and install dependencies 
COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g serve

#copy src
COPY public ./public
COPY src ./src

#build
RUN npm run build

#entrypoint
EXPOSE 5000
ENTRYPOINT ["serve","-s","build"]
