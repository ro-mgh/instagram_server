
# FROM node:12-alpine

# # Create app directory
# USER node
# RUN mkdir /home/node/code
# WORKDIR /home/node/code

# # Install app dependencies
# COPY --chown=node:node package-lock.json package.json ./

# RUN npm ci

# # Bundle app source
# COPY . /home/node/code
# RUN npm run build

# EXPOSE 3000
# CMD [ "npm", "start" ]



# test 2

FROM node:12-alpine AS builder

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY prisma ./prisma/

# Install app dependencies
RUN npm install
# Generate prisma client, leave out if generating in `postinstall` script
RUN npx prisma generate

COPY . .

RUN npm run build

FROM node:12-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
