FROM node:bullseye

ENV MONGO_SERVICE_HOST='127.0.0.1'
ENV MONGO_AUTH_USER='root'
ENV MONGO_AUTH_PWD='root'
ENV OTEL_SERVICE_NAME='cc-pacman'
ENV OTEL_RESOURCE_ATTRIBUTES='deployment.environment=cc-dev,service.version=1.0'

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Clone game source code
#RUN git clone https://github.com/font/pacman.git .
COPY . /usr/src/app/

# Install app dependencies
RUN npm install

# Expose port 8080
EXPOSE 8080

# Run container
CMD ["npm", "start"]
