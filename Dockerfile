# Use official node image as the base image
FROM node:lts-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /usr/local/app

# Copier le fichier package.json
COPY package*.json ./

# Remove the "prepare" script to avoid Husky issues
RUN sed -i '/"prepare":/d' package.json

# Install dependencies
RUN npm install --silent

# Add the source code from the app to the container
COPY . .


# Generate the build of the application
RUN npm run build --prod

# Étape de run avec Nginx pour servir l'application
FROM nginx:alpine
COPY --from=build /usr/local/app/dist/front-fonsis/browser /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

# Exposer le port 8086
EXPOSE 8086

# Démarrer Nginx
CMD ["nginx", "-g", "daemon off;"]