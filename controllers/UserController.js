const express = require('express');
const router = express.Router();
const {User} = require('../models');

const PREFIX = "/user";

router.post("/new", async (req, res) => {
    try {
        ({username, email, password, url_avatar, firstname, lastname, banned, firma} = req.body);
        
        const u = User.build({username: username, email:email, password:password, url_avatar:url_avatar, 
            firstname:firstname, lastname:lastname, banned:banned, firma:firma});
        const uCreated = await u.save();
        res.json({data:uCreated});
    } catch (error) {
        console.log(error);
        res.status(400).json({data:"That username is already used"});
    }
    
});

exports.PREFIX = PREFIX;
exports.router = router;