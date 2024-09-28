const ConnectDB = require('./blogDB');
const express = require('express');
const { home, register, blog_db, login } = require('./Controllers/routesController');
const app = express();

const cors = require('cors');

const bodyParser = require('body-parser');
app.use(bodyParser.json());

var corsOptions = {
    origin: 'http://localhost:5173',
    methods: "GET, PUT, PATCH, DELETE, POST, HEAD",
    credentials: true
  };
app.use(cors(corsOptions))

app.route("/").get(home);
app.route("/blogdata").get(blog_db);

app.route("/register").post(register);
app.route("/login").post(login);


const PORT = 1234;
ConnectDB().then(()=>{
    app.listen(PORT, ()=>{
        console.log(`Server is live at PORT: ${PORT}`)
    })
});
;

