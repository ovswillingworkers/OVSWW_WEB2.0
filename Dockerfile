# Use an official Node.js runtime as a parent image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Prisma
RUN npm install prisma@latest

# Copy the rest of the application code to /app
COPY . .

# Generate the Prisma client
RUN npx prisma generate

# Build the Next.js application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]
