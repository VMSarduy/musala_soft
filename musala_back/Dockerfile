FROM node:14.15.4-buster-slim

RUN set -ex && \
  apt-get update && \
  apt-get install -y postgresql && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

# COPY package.json and package-lock.json files
COPY package*.json ./

# COPY tsconfig.json
COPY tsconfig.json ./

# COPY yarn.lock file
COPY yarn.lock ./

# Install dependencies
RUN npm install

# generated prisma files
COPY lib ./lib/

# generated prisma files
COPY src ./src/

# COPY .editorconfig file
COPY .editorconfig ./

# COPY .env file
COPY .env ./

# COPY .eslintignore file
COPY .eslintignore ./

# COPY .eslintrc file
COPY .eslintrc ./

# COPY .gitignore file
COPY .gitignore ./

# generated prisma files
COPY prisma ./prisma/

RUN npx prisma generate

# Script to wait for the DB to be ready
COPY wait-for-db.sh ./

# Run and expose the server on port 3001
EXPOSE 3001

# A command to start the server
CMD sh ./wait-for-db.sh postgres; npx prisma migrate deploy; npm start
