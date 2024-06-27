const express = require('express');
const router = express.Router();
const {getMyProfData, updateMyProfData, getMyProfClasses, getStudentsFromClass, setGrade} = require('../../controllers/professeurController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/myData')
    .get(verifyRoles(ROLES_LIST.Prof), getMyProfData) // get profile information
    .put(verifyRoles(ROLES_LIST.Prof), updateMyProfData) // update profile information

router.route('/myClasses')
    .get(verifyRoles(ROLES_LIST.Prof), getMyProfClasses) // get list of classes 

router.route('/myClasses/:id')
    .get(verifyRoles(ROLES_LIST.Prof), getStudentsFromClass) // get students enrolled in class
    .put(verifyRoles(ROLES_LIST.Prof), setGrade) // set grade and set remark for a student

module.exports = router;