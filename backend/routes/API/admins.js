const express = require('express');
const router = express.Router();
const {createNewStudent, createNewProf, createNewAdmin} = require('../../controllers/adminController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/createNewStudent')
    .post(verifyRoles(ROLES_LIST.Admin), createNewStudent)

router.route('/createNewProf')
    .post(verifyRoles(ROLES_LIST.Admin), createNewProf)

router.route('/createNewAdmin')
    .post(verifyRoles(ROLES_LIST.Admin), createNewAdmin)

module.exports = router;