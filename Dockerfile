# Etapa 1 - Build da aplicação Angular com SSR
FROM node:22 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4200

CMD ["npx", "ng", "serve", "--host", "0.0.0.0"]




# RUN chmod +x ./node_modules/.bin/ng

# # Build da aplicação e do servidor SSR
# RUN ./node_modules/.bin/ng build --configuration production 

# # Etapa 2 - Executa a aplicação
# FROM nginx:alpine

# RUN rm -rf /usr/share/nginx/html/*

# # Copia os arquivos do Angular buildado
# COPY --from=build /app/dist/tcc_t-academy /usr/share/nginx/html

# # Copia a configuração personalizada do nginx
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Expõe a porta padrão
# EXPOSE 80

# # Comando de execução do servidor SSR
# CMD ["nginx", "-g", "daemon off;"]
