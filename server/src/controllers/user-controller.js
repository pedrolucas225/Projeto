'use strict';

const repository = require("../repositories/user-repository");

exports.register = async(req, res) => {
    try {
        const { nome, user, senha } = req.body;
        await repository.register({
            nome,
            user,
            senha
        });
        res.status(201).json({
            message: "Usuário cadastrado com sucesso"
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.login = async(req, res) => {
    try {
        const { user, senha } = req.body;
        const data = await repository.login({
            user,
            senha
        });
        res.status(200).json({
            status: data.status,
            token: data.token
        })
    } catch(error) {
        res.status(500).json({
            message: error.message,
            status: false
        });
    }
}