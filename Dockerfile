# FROM node:12-alpine
# # RUN npm i -g nodemon
# USER node
# RUN mkdir /home/node/code
# WORKDIR /home/node/code
# COPY --chown=node:node package-lock.json package.json ./
# RUN npm ci
# RUN npm run build
# COPY --chown=node:node ./dist .
# EXPOSE 3000
# CMD ["node", "src/index.js"]


FROM node:12-alpine

# Create app directory
USER node
RUN mkdir /home/node/code
WORKDIR /home/node/code

# Install app dependencies
COPY --chown=node:node package-lock.json package.json ./
RUN npm ci


# Bundle app source
COPY . /home/node/code
RUN npm run build

EXPOSE 3000
CMD [ "npm", "start" ]







## this is the stage one , also know as the build step

# FROM node:12.17.0-alpine
# WORKDIR /usr/src/app
# COPY package*.json ./
# COPY . .
# RUN npm install
# RUN npm run build

# FROM node:12-alpine
# USER node
# RUN mkdir /home/node/code
# WORKDIR /home/node/code
# COPY --chown=node:node package-lock.json package.json ./
# RUN npm ci
# COPY . .
# RUN npm run build

# ## this is stage two , where the app actually runs

# # FROM node:12.17.0-alpine
# # WORKDIR /usr/src/app
# # COPY package*.json ./
# # RUN npm install --only=production
# # COPY --from=0 /usr/src/app/dist ./dist
# # EXPOSE 3000
# # CMD npm start

# FROM node:12-alpine
# WORKDIR /home/node/code
# COPY package*.json ./
# RUN npm install --only=production
# COPY --from=0 /usr/src/app/dist ./dist
# EXPOSE 3000
# CMD npm start

