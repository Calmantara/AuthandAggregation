FROM node:8.10.0

#setup the working directory
RUN mkdir -p /usr/src/frontend
WORKDIR /usr/src/frontend

# setup the npm package
COPY package.json /usr/src/frontend
RUN npm install --save-dev

#copy all project files
COPY ./ /usr/src/frontend

#build arguments
ARG NODE_VERSIOn=8.10.0

#environment
ENV NODE_VERSION $NODE_VERSION