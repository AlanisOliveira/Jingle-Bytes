# Defina a imagem base do Node.js
FROM node:18.16.1


WORKDIR /app


COPY package*.json ./


RUN npm install


COPY . .


EXPOSE 3000


CMD ["node", "index.js"]
