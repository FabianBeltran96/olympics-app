# JSONServer + JWT Auth

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
