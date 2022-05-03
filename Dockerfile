FROM node:17-alpine

EXPOSE 8080

COPY ./.env /app/
COPY ./.env.example /app/
COPY ./package*.json /app/

WORKDIR /app/
RUN npm install 
COPY . /app/
CMD ["npm" , "start"]