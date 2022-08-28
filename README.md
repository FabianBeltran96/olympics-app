# olympics-app-quick

## Configuración del proyecto CLIENTE

Para instalar dependencias:

```
npm install
```

### Para correr el cliente

```
npm run serve
```

### Y se habilitara el siguiente link

```
http://localhost:8080/#/login
```

## Configuración del proyecto SERVIDOR (Fake JSON)

## Instalación

```bash
$ npm install
$ npm run start-auth
```

Posiblemente toca correrlo

```
npm audit fix
```

## Como logearse?

Te puedes loguear enviando un petición post a:

```
POST http://localhost:8000/auth/login
```

Con la siguiente información

```
{
  "email": "admin@email.com",
  "password":"admin"
}
{
  "email": "coordinador@email.com",
  "password":"coordinador"
}
```

Deberias recibir un token con el siguiente formato:

```
{
   "access_token": "<ACCESS_TOKEN>"
}
```
