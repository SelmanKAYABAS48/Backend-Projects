"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Authentication Controller:

const Token = require("../models/token");
const User = require("../models/user");// kullanıcı adı ve password sorgulayacağım için  user lazım
const passwordEncrypt = require("../helpers/passwordEncrypt");

const jwt = require('jsonwebtoken')

module.exports = {

    login: async (req, res) => {
        /*
                #swagger.tags = ["Authentication"]
                #swagger.summary = "Login"
                #swagger.description = 'Login with username (or email) and password for get simpleToken and JWT'
                #swagger.parameters["body"] = {
                    in: "body",
                    required: true,
                    schema: {
                        "username": "test",
                        "password": "aA?123456",
                    }
                }
            */

                //! burada validation yapmamız lazım yani aşağıdaki kodları çalıştıracağız
        const { username, email, password } = req.body;
        if (!((username || email) && password)) { //* username yada email yoksa zaten direk false'a düşüyor ve ! true'ya döndürüp if bloğuna giriyor..
            res.errorStatusCode = 401;//! bu hatayı dönemyi unutma
            throw new Error("username/email and password are required");
        }
        const user = await User.findOne({ $or: [{ username }, { email }] });//? ÖNEMLİ Kullanıcı adı veya email  sorugusu $or: ile yaılır
        if (user?.password !== passwordEncrypt(password)) {
            res.errorStatusCode = 401;
            throw new Error("incorrect username/email or password.");
        }
        if (!user.isActive) { //! kullanıcının login olabilmesi için active olması gerekiyor
            res.errorStatusCode = 401;
            throw new Error("This account is not active.");
        }

        /* SIMPLE TOKEN */

        //! token var mı yok mu diye check ediyorum
        // let ile tanımlanmasının nedeni daha sonra değer atayabileceğim için
        let tokenData = await Token.findOne({ userId: user.id }); //? userıd token modelindeki userId field'ı
        if (!tokenData) {
            tokenData = await Token.create({
                userId: user.id,
                token: passwordEncrypt(user.id + Date.now()),
            });
        }
        /* SIMPLE TOKEN */

        /* JWT */
        // ACCESS TOKEN
        const accessData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            isActive: user.isActive,
            isAdmin: user.isAdmin,
        }
        // Convert to JWT:
        // jwt.sign(payload, key, { expiresIn: '30m' })
        const accessToken = jwt.sign(accessData, process.env.ACCESS_KEY, { expiresIn: '30m' })

        // REFRESH TOKEN
        const refreshData = {
            _id: user._id,
            password: user.password
        }
        // Convert to JWT:
        const refreshToken = jwt.sign(refreshData, process.env.REFRESH_KEY, { expiresIn: '3d' })
        /* JWT */

        res.send({
            error: false,
            token: tokenData.token,// burası tokenData'nın içindeki token--userId created at olacak onları almayacağım sadece token'ı alacağım
            bearer: {
                access: accessToken,
                refresh: refreshToken
            },
            user,
        });
    },

    refresh: async (req, res) => {
        /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Refresh"
            #swagger.description = 'Refresh with refreshToken for get accessToken'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "bearer": {
                        refresh: '...refresh_token...'
                    }
                }
            }
        */
    },

    logout: async (req, res) => {
        /*
                #swagger.tags = ["Tokens"]
                #swagger.summary = "Create Token"
            */

        const auth = req.headers?.authorization; //"Token token" //! headers'ta token gönderdiğimiz kısım
        const tokenKey = auth ? auth.split(" ") : null; // [ "Token", tokenKey] //? burada auth varsa split yap yoksa null döndür

        if (tokenKey[0] == "Token") {
 
            const result = await Token.deleteOne({ token: tokenKey[1] });
    
            res.send({
                error: false,
                message: "Token deleted. Logout was OK.",
                result,
            });

        } else if (tokenKey[0] == "Bearer") {

            res.send({
                error: false,
                message: 'JWT: No need any process for logout.',
            })

        }
    },
};

