# Use the official Node.js 18 image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code to the container
COPY . .

# Remove .env if exists and create a new one
RUN if [ -f ".env" ]; then rm .env; fi && \
    echo "SKIP_PREFLIGHT_CHECK=true" >> .env && \
    echo "REACT_APP_ENV=development" >> .env

#ENV NEXT_PUBLIC_API_URL=https://api.zsystems.com.br
ENV NEXT_PUBLIC_API_URL=https://api-release.nectaco.com.br
ENV NEXT_PUBLIC_API_PAS=https://pas.nectaco.com.br

# Build the Next.js application
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "run", "start"]
