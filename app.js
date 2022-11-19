const express = require('express');
const app = express();
const cors = require('cors');
const { urlencoded, json } = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
require('dotenv').config()

const userController = require('./controllers/UserController');

app.use(cors());
app.use(express.json())
app.use(urlencoded({extended:false}));

require('./auth');

app.use(userController.PREFIX, userController.router);

app.post("/login", passport.authenticate('local', {session:false}),
    function(req, res) {
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60),//60 minutes exp
            data: {id: req.user}
        }, process.env.SECRET_JWT_KEY);
        res.json({token:"Bearer "+token});
    }
);

app.get("/", (req, res) => {
    res.json({asd:req.user});
});

exports.app = app;



/*Sincronizacion con la DB*/

const models = require('./models/');
const {Sequelize} = require('sequelize');
const sequelize = new Sequelize('db_development', 'root', '', {
    host: 'localhost',
    dialect: "mysql"/* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});
(async () => {
    await models.User.sync({ force: true });
    let asd = await sequelize.sync({ force: true });
})();