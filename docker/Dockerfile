FROM node:10 as base

RUN cd / \
  && git clone https://github.com/kenperlin/chalktalk.git --depth=1 \
  && cd chalktalk/server \
  && npm install

WORKDIR /chalktalk

EXPOSE 11235

ENTRYPOINT ["node", "server/main.js"]
