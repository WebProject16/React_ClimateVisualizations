# React_ClimateVisualizations

Technologies used in this project: React, Bootstrap 5, Node.js, Express.js and JavaScript.

## How to run

`npm install` in project root, frontend/ and backend/ to install needed dependencies

Setup .env file in root of the backend directory

Example .env file
```
HOST=127.0.0.1
USER=root
PASSWORD=super_secret_passsword
DATABASE=db16
PORT=8080
TOKEN=some_secret_password
```

`npm run devRun` in backend/ for nodemon

`npm start` in frontend/ for react 

--- 
### Or optionally you can start both of them via:

`npm run startDev` in project root to start both via npm concurrently

---

## Available endpoints that don't need authentication

`POST: /user/register` username, password, password_rpt

`POST: /user/login` username, password

`GET: /charts/v1`

`GET: /charts/v3`

`GET: /charts/v4`

`GET: /charts/v5`

`GET: /charts/v6`

`GET: /charts/v7`

`GET: /charts/v8`

`GET: /charts/v9`

---

## Available endpoints that need authentication

`DELETE: /user/deleteUser` username, password

`DELETE: /view/:url` delete a view

`GET: /user/token`

`GET: /view/users/all` fetch users views

`POST: /view/` create a view

---

## Testing

`npm test` in frontend/ and backend/ for running automatic test script. Actual test script includes this command line:

`jest --watchAll --detectOpenHandles` in backend/

`react-scripts test --watchAll` in frontend/

---

![eer](https://user-images.githubusercontent.com/101475167/207702681-7042a97c-b860-4a6b-96a3-1de2786e1c92.png)


*Creators: Helmi Laakkonen, Lasse Suomela, Miko Prykäri and Pinja Kemppainen*
