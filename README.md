 -ltr# pacman-splunk
Pac-Man

## Install dependencies

```
npm install
```

## Getting started

```
npm run start
```

## Development

```
npm run dev
```

## Create Application Container Image

### Docker Container Image

The [Dockerfile](docker/Dockerfile) performs the following steps:

1. It is based on Node.js LTS Version 6 (Boron).
1. It then clones the Pac-Man game into the configured application directory.
1. Exposes port 8080 for the web server.
1. Starts the Node.js application using `npm start`.

To build the image run:

From the main folder

```
docker build --no-cache --platform linux/amd64 -t <registry>/<user>/pacman-splunk -f docker/Dockerfile .
```

You can test the image by creating an `env.sh` file from the `env.sh.template` file and then running:

```
./start_pacman_docker.sh
```

And going to `http://localhost:8000/` to see if you get the Pac-Man game.

Once you're satisfied you can push the image to the container registry.

```
docker push <registry>/<user>/pacman-nodejs-app
```

### Building using an s2i image

```
s2i build . centos/nodejs-6-centos7 pacman
```
