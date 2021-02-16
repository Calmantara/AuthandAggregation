FROM node:8.10.0

#setup the working directory
RUN mkdir -p /usr/src/auth-backend
WORKDIR /usr/src/auth-backend

# setup the npm package
COPY package.json /usr/src/auth-backend
RUN npm install --save-dev

#copy all project files
COPY ./ /usr/src/auth-backend

#build arguments
ARG NODE_VERSIOn=8.10.0

#environment
ENV NODE_VERSION $NODE_VERSION