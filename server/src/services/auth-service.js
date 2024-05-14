'use strict';

const jwt = require("jsonwebtoken");
const SALT_KEY = "secret";

exports.generateToken = async(user) => {
    return jwt.sign({
        user: user.user,
        nome: user.nome
    }, SALT_KEY, {
        expiresIn: "1d"
    });
}

exports.authentication = (req, res) => {
    const token = req.headers.token;
    
    if(!token) {
        res.status(401).json({
            status: false
        });
    } else {
        jwt.verify(token, SALT_KEY, (error, decoded) => {
            if(error) {
                res.status(401).json({
                    status: false,
                    error: error.message
                });
            } else {
                const { nome } = decoded;
                res.status(200).json({
                    status: true,
                    nome: nome
                });
            }
        });
    }
}