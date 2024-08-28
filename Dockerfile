FROM node:18.0.0 as builder

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=development

# Defina o diretório de trabalho no contêiner
WORKDIR /app

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