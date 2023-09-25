FROM node:16.13.2-alpine

RUN mkdir /usr/build-deck

COPY . /usr/build-deck

WORKDIR  /usr/build-deck

EXPOSE 3000


RUN yarn && \
    yarn next build && \
    yarn cache clean

CMD ["yarn", "next", "start"]