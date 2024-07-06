const express = require('express');
const router = express.Router();
const {createNewStudent, createNewProf, createNewAdmin, createNewClass, getAllProfs, getAllSubjects, getAllStudents, getStudentCurrentOrientation, getClassesFromOrientation, getClassesFromStudent, addStudentToClass, getOrienatationsTroncCommun} = require('../../controllers/adminController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/createNewStudent')
    .post(verifyRoles(ROLES_LIST.Admin), createNewStudent)

router.route('/createNewProf')
    .post(verifyRoles(ROLES_LIST.Admin), createNewProf)

router.route('/createNewAdmin')
    .post(verifyRoles(ROLES_LIST.Admin), createNewAdmin)

router.route('/createNewClass')
    .post(verifyRoles(ROLES_LIST.Admin), createNewClass)

router.route('/getAllProfs')
    .get(verifyRoles(ROLES_LIST.Admin), getAllProfs)

router.route('/getAllSubjects')
    .get(verifyRoles(ROLES_LIST.Admin), getAllSubjects)

router.route('/getAllStudents')
    .get(verifyRoles(ROLES_LIST.Admin), getAllStudents)

router.route('/addStudentToClass')
    .post(verifyRoles(ROLES_LIST.Admin), addStudentToClass)

router.route('/getStudentCurrentOrientation/:student_id/:niveau')
    .get(verifyRoles(ROLES_LIST.Admin), getStudentCurrentOrientation)

router.route('/getClassesFromOrientation/:orientation_id/:student_id')
    .get(verifyRoles(ROLES_LIST.Admin), getClassesFromOrientation)

router.route('/getClassesFromStudent/:student_id/:niveau')
    .get(verifyRoles(ROLES_LIST.Admin), getClassesFromStudent)

router.route('/getOrienatationsTroncCommun')
    .get(verifyRoles(ROLES_LIST.Admin), getOrienatationsTroncCommun)

module.exports = router;