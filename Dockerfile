FROM node:18.0.0 as builder

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=dev

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# COPY db.sql /docker-entrypoint-initdb.d/

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante do código da aplicação
COPY . .

# Exponha a porta que a aplicação irá rodar
EXPOSE 8080

# Comando para rodar a aplicação
CMD ["npm", "start"]