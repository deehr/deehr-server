FROM node:16.0.0

COPY . ./
RUN npm install


CMD ["node.exe", "./index.js", "start"]