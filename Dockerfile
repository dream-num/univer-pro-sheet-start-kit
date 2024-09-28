FROM univer-acr-registry.cn-shenzhen.cr.aliyuncs.com/devops/node:18.17.0-alpine3.18

ARG proxy

COPY ./dist ./dist
COPY ./.github/server ./

ENV UNIVERSER_ENDPOINT=http://universer:8000
RUN [[ "$proxy" == "" ]] && pnpm install || http_proxy=$proxy https_proxy=$proxy 

EXPOSE 3010

CMD ["pnpm", "start"]
