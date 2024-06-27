const professeurs = require('../model/professeurs')
const etudiants = require('../model/etudiants')
const admins = require('../model/admins')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Generate JWT
const generateToken = (id, role) => {
    return jwt.sign({ id: id, role: role }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
}

const login = async (req, res) => {
    const user_id = req.body.user_id;
    const password = req.body.password;
    const role = req.body.role;

    if (!user_id || !password || !role) {
        return res.sendStatus(400);
    }

    let users;
    if (role === "1") {users = await professeurs.getProfCredentials(user_id);}
    else if (role === "2") {users = await etudiants.getEtudCredentials(user_id);}
    else if (role === "3") {users = await admins.getAdminCredentials(user_id);}

    if (users && users.length !== 0 && (await bcrypt.compare(password, users[0].Password))) {
        const user = users[0];
        res.json({
            user_id: user.User_ID,
            role: role,
            token: generateToken(user.User_ID, role),
            message: 'success',
          });
    } else {
        return res.sendStatus(400)
    }
}

module.exports = {login};