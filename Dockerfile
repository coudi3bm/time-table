FROM node:16-alpine
RUN apk add --no-cache python3 gcc g++ make
WORKDIR /app
COPY . .
RUN yarn
RUN yarn run build
CMD yarn run start
