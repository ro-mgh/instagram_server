
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

