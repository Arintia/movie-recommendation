FROM node:alpine

LABEL version="1.0"
LABEL description="This is the base docker image for the movie recommendation app's backend API."
LABEL maintainer = ["arantiabusiness@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN npm i
COPY . .

EXPOSE 3001

CMD ["npm", "start"]