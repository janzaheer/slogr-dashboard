FROM node:14-alpine

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY cert.crt ./
COPY private.key ./


COPY . .

RUN npm run build
RUN ls
EXPOSE 80
EXPOSE 443

# CMD ["http-server", "dist", "-p", "80", "-c-1"]

# CMD ["npm", "run", "dev", "--", "--host", "--port", "80"]

CMD ["http-server", "dist", "-S", "-p", "443", "--ssl", "--crt", "/app/cert.crt", "--key", "/app/private.key"]

