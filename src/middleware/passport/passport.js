const { logger } = require("../../utils/logger");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Users } = require("../../domain/models/usuarios.model");

const loginStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, username, password, done) => {
        Users.findOne({email: username})
        .then(userDocument => {
            if(!userDocument) return done('Invalid Email');

            const passwordsMatch = password === userDocument.password;
            if (!passwordsMatch) return done('Invalid Password');
            
            // req.session.username = userDocument.nombre;
            // req.session.email = userDocument.email;

            return done(null, userDocument); 
        })
        .catch ((error) => {
            done(error);
        })
    }
)


const signUpStrategy = new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    (req, username, password, done) => {
        logger.trace("Passport signup ome : " , req.body);
        Users.findOne({ email: username })
        .then(userDocument => {
            if(userDocument) return done("Mail ya registrado");
            
            let newUser = new Users(req.body);

            newUser.save((err) => {
                if (err) {
                    logger.error("Error in Saving user: " + err);
                    throw err;
                }
                logger.info("User Registration succesful");
                // req.session.username = newUser.nombre;
                // req.session.email = newUser.email;
                return done(null, newUser);
            });                
        })
        .catch ((error) => {
            done(error);
        })
    }
)

const serializeUser = (user, done) => {
    done(null, user._id);
}

const deserializeUser = (id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user);
    });
}

module.exports = {
    loginStrategy: loginStrategy,
    signUpStrategy: signUpStrategy,
    serializeUser: serializeUser,
    deserializeUser: deserializeUser
}