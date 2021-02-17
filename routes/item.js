const express = require('express');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const Item = require('../models/Item');
const router = express.Router();

// @route    POST /api/item
// @desc     create new item
// @access   private
router.post('/', [auth,
    check('name', 'Name is required').notEmpty(),
    check('quantity', 'Quantity is required').isNumeric()
], async (req, res) => {
    // get errors
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // create item
        const item = await Item.create(req.body);

        res.json(item);
    } catch(err) {
        console.error(err);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    GET /api/item
// @desc     get all items
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        // get items
        const items = await Item.find({}).sort('-date');

        res.json(items);
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: 'Server error'});
    }
});

// @route    POST /api/item/search
// @desc     search item
// @access   private
router.post('/search', [auth,
    check('name', 'Name is required').notEmpty()
], async (req, res) => {
    // get errors
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    // make a regex pattern
    const pattern = new RegExp(req.body.name);

    try {
        // get items
        const items = await Item.find({name: {$regex: pattern, $options: 'i'}}).sort('-date');

        res.json(items);
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: 'Server error'});
    }
});

// @route    GET /api/item/:itemId
// @desc     get item by id
// @access   private
router.get('/:itemId', async (req, res) => {
    try {
        // get item
        const item = await Item.findById(req.params.itemId);

        // check if item does not exists
        if(!item) {
            return res.status(404).json({errors: [{msg: 'Item does not exists'}]});
        }

        res.json(item);
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: 'Server error'});
    }
});

// @route    PUT /api/item/:itemId
// @desc     update item
// @access   private
router.put('/:itemId', [auth,
    check('name', 'Name is required').notEmpty(),
    check('quantity', 'Quantity is required').isNumeric()
], async (req, res) => {
    // get errors
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, quantity} = req.body;

    try {
        // find item
        const item = await Item.findById(req.params.itemId);

        // check if item does not exists
        if(!item) {
            return res.status(404).json({errors: [{msg: 'Item does not exists'}]});
        }

        // update item
        item.name = name;
        item.quantity = quantity;

        // save item
        await item.save();

        res.json(item);
    } catch(err) {
        console.error(err);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    DELETE /api/item/:itemId
// @desc     delete item
// @access   private
router.delete('/:itemId', auth, async (req, res) => {
    try {
        // find item
        const item = await Item.findById(req.params.itemId);

        // check if item does not exists
        if(!item) {
            return res.status(404).json({errors: [{msg: 'Item does not exists'}]});
        }

        // delete item
        await item.delete();

        res.json({msg: 'Deleted'});
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: 'Server error'});
    }
});

module.exports = router;