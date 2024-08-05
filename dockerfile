FROM node:14

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3000

CMD ["node", "server"]

### falta crear la imagen, comando: docker build -t "NOMBRE DE LA IMAGEN SIN LAS COMILLAS