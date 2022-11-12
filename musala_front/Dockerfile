FROM node:14.15.4-alpine

WORKDIR /app

# generated prisma files
COPY public ./public/

# generated prisma files
COPY src ./src/

# COPY .gitignore file
COPY .gitignore ./

# COPY package.json and package-lock.json files
COPY package*.json ./

RUN npm install

# Run and expose the server on port 3000
EXPOSE 3000

# A command to start the server
CMD npm start
