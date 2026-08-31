# syntax=docker/dockerfile:1

# --- Build stage -----------------------------------------------------------
FROM node:22-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# VITE_API_URL is baked in at build time; override with --build-arg as needed.
ARG VITE_API_URL=http://localhost:3030
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# --- Runtime stage (rootless static server) --------------------------------
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
