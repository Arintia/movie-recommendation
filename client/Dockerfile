FROM node:alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the movie recommendation app's frontend."
LABEL maintainer = ["arantiabusiness@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm", "start"]