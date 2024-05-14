'use strict';

const router = require("express").Router();
const controller = require("../controllers/user-controller");
const authService = require("../services/auth-service");

router.get("/", (req, res) => {
    res.status(200).json({
        message: "API"
    });
});

// register
router.post("/register", controller.register);

// login
router.post("/login", controller.login);

// authentication
router.get("/auth", authService.authentication);

module.exports = router;