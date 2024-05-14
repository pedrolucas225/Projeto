'use strict';

const util = require("node:util");
const database = require("../../config/database");
const query = util.promisify(database.query).bind(database);
const authService = require("../services/auth-service");

exports.register = async({ nome, user, senha }) => {
    try {
        const sqlCheckUser = `
            SELECT
                COUNT(*) AS count
            FROM 
                usuario
            WHERE
                user = ?
        `;
        const [{ count }] = await query(sqlCheckUser, user);
        
        if(count > 0) {
            throw new Error("O usuário já está cadastrado");
        }

        const sqlInsertUser = `
            INSERT INTO
                usuario
                (id, nome, user, senha)
            VALUES
                (default, ?, ?, ?)
        `;
        
        await query(sqlInsertUser, [nome, user, senha]);
    } catch(error) {
        throw new Error(error.message);
    }
}

exports.login = async({ user, senha }) => {
    try {
        const sqlSearchUser = `
            SELECT * FROM
                usuario
            WHERE
                user = ?
        `;
        const userObj = (await query(sqlSearchUser, user))[0];

        if(!user || (userObj.senha !== senha)) {
            throw new Error("Senha ou usuário incorretos");
        }

        const token = await authService.generateToken(userObj);

        return {
            token: token,
            status: true
        }
    } catch(error) {
        throw new Error(error.message);
    }
}