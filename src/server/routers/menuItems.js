const express = require('express');

const menuItems = require('../controllers/menuItems');

const router = express.Router();

/**
 * search a menu list
 * @param {object} req
 * @param {object} res
 * @returns {list} a menu list
 */
router.get('/', menuItems.getItems);

module.exports = router;
