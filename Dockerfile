# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory inside container
WORKDIR /app

# Copy dependency files first (Docker cache optimization)
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application source
COPY src ./src

# Expose application port
EXPOSE 3000

# Start the application
CMD ["node", "src/server.js"]
