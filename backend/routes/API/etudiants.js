const express = require('express');
const router = express.Router();
const {getMyEtudData, updateMyEtudData, getMyEtudClasses, getEtudClass, addComment, getMyEtudClasses1, getMyEtudClasses2, getMyEtudClasses3, getOrientationName, getEtudGrade1, getEtudGrade2, getEtudGrade3, getCurrentOrientation, getPossibleOrientations, enrollInNextOrientation, getMyLevel} = require('../../controllers/etudiantController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/myData')
    .get(verifyRoles(ROLES_LIST.Etudiant), getMyEtudData) // get profile information
    .put(verifyRoles(ROLES_LIST.Etudiant), updateMyEtudData) // update profile information

router.route('/myClasses')
    .get(verifyRoles(ROLES_LIST.Etudiant), getMyEtudClasses) // get student classes

router.route('/myClasses/:id')
    .put(verifyRoles(ROLES_LIST.Etudiant), addComment) // add comment

router.route('/myClass/:id')
    .get(verifyRoles(ROLES_LIST.Etudiant), getEtudClass)

router.route('/Tronc-Commun')
    .get(verifyRoles(ROLES_LIST.Etudiant), getMyEtudClasses1) // get 1st year classes
    .post() // enroll in 1st year orientation

router.route('/Bac-1')
    .get(verifyRoles(ROLES_LIST.Etudiant), getMyEtudClasses2) // get 2nd year classes
    .post() // enroll in 2nd  year orientation

router.route('/Bac-2')
    .get(verifyRoles(ROLES_LIST.Etudiant), getMyEtudClasses3) // get 3rd year classes
    .post() // enroll in 3rd year orientation

router.route('/getOrientationName/:orientation_id')
    .get(verifyRoles(ROLES_LIST.Etudiant), getOrientationName)

router.route('/getEtudGrade1')
    .get(verifyRoles(ROLES_LIST.Etudiant), getEtudGrade1)

router.route('/getEtudGrade2')
    .get(verifyRoles(ROLES_LIST.Etudiant), getEtudGrade2)

router.route('/getEtudGrade3')
    .get(verifyRoles(ROLES_LIST.Etudiant), getEtudGrade3)

router.route('/getCurrentOrientation/:niveau')
    .get(verifyRoles(ROLES_LIST.Etudiant), getCurrentOrientation)

router.route('/getPossibleOrientations/:orientation_id')
    .get(verifyRoles(ROLES_LIST.Etudiant), getPossibleOrientations)

router.route('/enrollInNextOrientation')
    .put(verifyRoles(ROLES_LIST.Etudiant), enrollInNextOrientation)

router.route('/getMyLevel')
    .get(verifyRoles(ROLES_LIST.Etudiant), getMyLevel)

module.exports = router;