# this image relies on the nodejs image
FROM node:8.10-alpine

# installing ffmpeg
RUN apk add --no-cache ffmpeg

# set working directory
WORKDIR /usr/src/jukeB0X
#
ENV PATH /usr/src/jukeB0X/node_modules/.bin:${PATH}

ENV TOKEN_SECRET changeme
ENV DEBUG users-d

ADD package.json .
RUN npm install
#
ADD gulpfile.js .
ADD src src

CMD npm start
