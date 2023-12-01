# Use a imagem base Node.js
FROM node:16

# Defina o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie todo o código-fonte para o diretório de trabalho
COPY . .

RUN npm run build

# Exponha a porta do servidor
EXPOSE 3001

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]