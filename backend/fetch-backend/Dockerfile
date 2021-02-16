FROM node:8.10.0

#setup the working directory
RUN mkdir -p /usr/src/fetch-backend
WORKDIR /usr/src/fetch-backend

# setup the npm package
COPY package.json /usr/src/fetch-backend
RUN npm install --save-dev

#copy all project files
COPY ./ /usr/src/fetch-backend

#build arguments
ARG NODE_VERSIOn=8.10.0

#environment
ENV NODE_VERSION $NODE_VERSION