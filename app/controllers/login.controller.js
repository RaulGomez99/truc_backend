const Profile = require('../models/profile.model');
const bcrypt  = require('bcrypt');


module.exports = {
    register,
    login,
    getall
}

async function register(req, res){
    if(!req.body){
        return res.status(400).send({message: "No se ha recibido datos"});
    }

    const {username, password, email, name, surnames} = req.body;
    console.log(req.body)
    const profile = new Profile({
        username,
        password,
        email,
        name,
        surnames
    });

    profile.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Hay algún error"
        })
    });
}

async function login(req, res){
    if(!req.body){
        return res.status(400).send({message: "No se ha recibido datos"});
    }

    const {username, password} = req.body;

    const profile = await Profile.findOne({
        username
    });
    if(!profile) return res.send(false);
    const resp = await bcrypt.compare(password, profile.password);
    res.send(resp);
}

async function getall(req, res){
    const profiles = await Profile.find();
    res.send(profiles);
}