const db = require('../models/');
const User = db.User;
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        .then(() => res.status(201).json({ message: 'User created successfully!' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ where: { email: req.body.email } })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Incorrect username or password' });
        }
        bcrypt.compare(req.body.password, user.password)
        .then(valid => {
            if (!valid) {
                return res.status(401).json({ message: 'Incorrect username or password' });
            }
            res.status(200).json({
                userId: user.idUsers,
                token: jwt.sign(
                    { userId: user.idUsers },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '365d' }
                )
            });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};



// const users = require('../models/user');
// const bcrypt = require('bcrypt');
// const jwt = require("jsonwebtoken");

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//     .then(hash => {
//         const user = new users ({
//             email: req.body.email,
//             password: hash
//         });
//         user.save()
//             .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//             .catch(error => res.status(400).json({ error }));
//     })
//     .catch(error => res.status(500).json({ error }));
// };

// // exports.signup = (req, res, next) => {
// //     User.findOne({ where: { email: req.body.email } })
// //     .then(user => {
// //         if (user) {
// //             return res.status(400).json({ error: 'Email already in use!' });
// //         }
// //         bcrypt.hash(req.body.password, 10)
// //         .then(hash => {
// //             const newUser = User.create({
// //                 email: req.body.email,
// //                 password: hash,
// //                 username: req.body.username
// //             });
// //             newUser.save()
// //                 .then(() => res.status(201).json({ message: 'User created successfully!' }))
// //                 .catch(error => res.status(400).json({ error }));
// //         })
// //         .catch(error => res.status(500).json({ error }));
// //     })
// //     .catch(error => res.status(500).json({ error }));
// // };


// exports.login = (req, res, next) => {
//     users.findOne({email: req.body.email})
//     .then(user => {
//         if (user === null) {
//             res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'});
//         } else {
//             bcrypt.compare(req.body.password, user.password)
//             .then(valid => {
//                 if (!valid){
//                     res.status(401).json({message: 'Paire identifiant/mot de passe incorrecte'})
//                 } else {
//                     res.status(200).json({
//                         userId: user._id,
//                         token: jwt.sign(
//                             {userId:user._id},
//                             'RANDOM_TOKEN_SECRET',
//                             {expiresIn: '24h'}
//                         )
//                     });
//                 }
//             })
//             .catch(error => {
//                 res.status(500).json({error});
//             })
//         }
//     })
//     .catch(error => {
//         res.status(500).json({error});
//     })
// };
