FROM node:20-alpine

WORKDIR /usr/src/app

# Copy dependency manifests first for layer caching
COPY package.json package-lock.json ./

# Install dependencies (includes dotenv)
RUN npm install

# Copy app source
COPY . .

# App port
EXPOSE 5000

# Run
CMD ["npm", "start"]
