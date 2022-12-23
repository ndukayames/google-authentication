FROM node:lts-alpine

WORKDIR /app

COPY . .

USER node

CMD ["npm", "start", "server"]

EXPOSE 8000