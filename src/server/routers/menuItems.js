const express = require('express');

const { getItems } = require('../controllers/menuItems');

const router = express.Router();

/**
 * search a menu list
 * @param {object} req
 * @param {object} res
 * @returns {list} a menu list
 */
router.get('/', getItems);

module.exports = router;
