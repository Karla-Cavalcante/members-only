
const express = require('express');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

const router = express.Router();


router.get('/login', (req, res) => {
    res.render('login', { title: 'Login Page' });
});


router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login',
        failureFlash: true
    })
);


router.get('/signup', (req, res) => {
    res.render('signup', { title: 'Sign Up Page' });
});


router.post('/signup',
    [
        body('first_name').trim().notEmpty().withMessage('First name is required.'),
        body('last_name').trim().notEmpty().withMessage('Last name is required.'),
        body('username').isEmail().withMessage('Valid email is required.'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match!');
            }
            return true;
        })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('signup', { errors: errors.array() });
        }
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            await User.createUser({
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                username: req.body.username,
                password: hashedPassword,
                membership_status: false,
                is_admin: req.body.is_admin === 'on'
            });
            res.redirect('/auth/login');
        } catch (err) {
            res.status(500).send('Error creating user');
        }
    }
);


router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});


module.exports = router;
