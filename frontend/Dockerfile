# Use an official, lightweight Node image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install your frontend dependencies
RUN npm install

# Copy the rest of your React/Vite code
COPY . .

# Expose Vite's default port
EXPOSE 5173

# Run the Vite development server and expose it to the network
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]