# React_ClimateVisualizations

Technologies: Node.js, React and Javascript

### `npm install` in project root, frontend/ and backend/ to install needed dependencies

### `npm run devRun` in backend/ for nodemon

### `npm start` in frontend/ for react 

### `npm run startDev` in project root to start both via npm concurrently

## Available endpoints

`POST: /user/register`     username, password, password_rpt

`POST: /user/login`        username, password

`DELETE: /user/deleteUser`  username, password

`GET: /charts/v1`


## .env
Example .env file
```
HOST=127.0.0.1
USER=root
PASSWORD=super_secret_passsword
DATABASE=db16
PORT=8080
TOKEN=some_secret_password
```
*Creators: Helmi Laakkonen, Lasse Suomela, Miko Prykäri and Pinja Kemppainen*
