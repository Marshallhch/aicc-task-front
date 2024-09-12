# Use the official Node.js image based on Alpine Linux for building the React app
FROM node:alpine3.18 as build

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json file to the working directory
COPY package.json .

# Install the dependencies specified in package.json
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Build the React application
RUN npm run build

# Use the official Nginx image based on Alpine Linux for serving the built React app
FROM nginx:1.23-alpine

# Set the working directory inside the container to the default Nginx HTML directory
WORKDIR /usr/share/nginx/html

# Remove all files in the working directory (default Nginx HTML directory)
RUN rm -rf *

# Copy the built React app from the build stage to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built React app from the build stage to the Nginx HTML directory
# COPY --from=build /app/build .

# Expose port 80 to allow external access to the Nginx server
EXPOSE 80

# Start Nginx in the foreground (do not daemonize)
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]