const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

//restore session user
router.get('/', restoreUser,(req, res) => {
    const { user } = req;
    if (user) {
      return res.json(user.toSafeObject());
    } else return res.json(null);
  }
);

//login
router.post('/',validateLogin, async (req, res, next) => {
      const { credential, password } = req.body;

      let user = await User.login({ credential, password });

      if (!user) {
        res.status(401).json({
          message: "Invalid credentials",
          statusCode: 401
        })
      }

      let token = await setTokenCookie(res, user);
      user = user.toJSON()
      user.token = token
      return res.json(user);
    }
  );

  //log out
  router.delete('/',(_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );


module.exports = router;
