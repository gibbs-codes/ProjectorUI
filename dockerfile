FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./
RUN npm install

# Copy the .env file explicitly
COPY .env .env

# Copy the rest of the application code
COPY . .

# Build the React App (now using the .env file)
RUN npm run build

# Install the serve package globally
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 3000

# Define the command to serve the built app
CMD ["serve", "-s", "build", "-l", "3000"]