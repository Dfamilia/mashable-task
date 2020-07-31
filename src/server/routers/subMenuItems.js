const express = require('express');

const { subMenuItems } = require('../controllers/subMenuItems');

const router = express.Router();

/**
 * search a menu list
 * @param {object} req
 * @param {object} res
 * @returns {list} a menu list
 */
router.get('/', subMenuItems);

module.exports = router;
