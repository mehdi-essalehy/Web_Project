const express = require('express');
const router = express.Router();
const {getMyEtudData, updateMyEtudData, getMyEtudClasses, addComment, getMyEtudClasses1, getMyEtudClasses2, getMyEtudClasses3} = require('../../controllers/etudiantController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/myData')
    .get(verifyRoles(ROLES_LIST.Etudiant), getMyEtudData) // get profile information
    .put(verifyRoles(ROLES_LIST.Etudiant), updateMyEtudData) // update profile information

router.route('/myClasses')
    .get(verifyRoles(ROLES_LIST.Etudiant), getMyEtudClasses) // get student classes

router.route('/myClasses/:id')
    .put(verifyRoles(ROLES_LIST.Etudiant), addComment) // add comment

router.route('/Tronc-Commun')
    .get(getMyEtudClasses1) // get 1st year classes
    .post() // enroll in 1st year orientation

router.route('/Bac-1')
    .get(getMyEtudClasses2) // get 2nd year classes
    .post() // enroll in 2nd  year orientation

router.route('/Bac-2')
    .get(getMyEtudClasses3) // get 3rd year classes
    .post() // enroll in 3rd year orientation

module.exports = router;