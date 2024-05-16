import express from 'express';
// import { createUser, loginUser } from '../controllers/userController.js';
import jwt from 'jsonwebtoken'
import { body, validationResult } from 'express-validator';
import bcrypt from 'bcryptjs';
import user from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config()

const userRouter = express.Router()

userRouter.post('/createUser',
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 8 }),
    body('name', 'name should be minimum three characters').isLength({ min: 3 })
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const salt = await bcrypt.genSalt(10)
            const pass = await bcrypt.hashSync(req.body.password, salt)

            let userData = new user({
                email: req.body.email,
                name: req.body.name,
                password: pass
            })
            await userData.save()
            res.json({ message: "Inserted into db", success: true })
        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }
    });

userRouter.post('/loginUser',
    body('email', 'Incorrect email').isEmail(),
    body('password', 'Incorrect Password').isLength({ min: 8 })
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            let resp = (await user.find({ email: req.body.email }))[0]

            if (!resp) {
                return res.status(400).json({ errors: "Email does not exists" })
            }

            const isPassCorrect = await bcrypt.compare(req.body.password, resp.password)
            if (!isPassCorrect) {
                return res.status(400).json({ errors: "Password Incorrect" })
            }
            resp = resp._doc

            const { password, ...otherDet } = resp

            const data = {
                user: {
                    id: resp._id
                }
            }

            const token = jwt.sign(data, process.env.JWT)
            res.cookie("access_token", token, { httpOnly: true }).status(200).json({ result: otherDet, token : token, success: true })
        } catch (err) {
            console.log(err)
            res.json({ success: false })
        }

    }
);

export default userRouter;