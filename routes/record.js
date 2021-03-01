const express = require('express');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const Record = require('../models/Record');
const Item = require('../models/Item');
const router = express.Router();

// @route    POST /api/record
// @desc     create new record
// @access   private
router.post('/', [auth,
    check('name', 'Name is required').notEmpty(),
    check('department', 'Department is required').notEmpty(),
    check('itemId', 'Item ID is required').notEmpty(),
    check('itemName', 'Item name is required').notEmpty(),
    check('itemQuantity', 'Item quantity must be a number').isNumeric(),
    check('studentNumber', 'Student Number is required').notEmpty(),
    check('contact', 'Contact Number is required').notEmpty()
], async (req, res) => {
    // get errors
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, department, itemId, itemName, itemQuantity, studentNumber, contact} = req.body;

    try {
        // find item
        const item = await Item.findById(itemId);

        // check if item does not exists
        if(!item) {
            return res.status(404).json({errors: [{msg: 'Item not found'}]});
        }

        // check if not enough stocks
        if(item.quantity < itemQuantity) {
            return res.status(401).json({errors: [{msg: 'Not enough stocks'}]});
        }

        // reduce number of stocks
        item.quantity -= itemQuantity;

        // save item
        await item.save();

        // create record
        const record = await Record.create({name, department, itemId, itemName, itemQuantity, studentNumber, contact});

        res.json(record);
    } catch(err) {
        console.error(err);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    GET /api/record
// @desc     get all records
// @access   private
router.get('/', auth, async (req, res) => {
    try {
        // get records
        const records = await Record.find({}).sort('-date');

        res.json(records);
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: 'Server error'});
    }
});

// @route    POST /api/record/status
// @desc     get records according to status
// @access   private
router.post('/status', [auth,
    check('status', 'Status is required').notEmpty()
], async (req, res) => {
    // get errors
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // get records
        const records = await Record.find({status: req.body.status}).sort('-date');

        res.json(records);
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: 'Server error'});
    }
});

// @route    GET /api/record/:recordId
// @desc     get record by id
// @access   private
router.get('/:recordId', async (req, res) => {
    try {
        // get record
        const record = await Record.findById(req.params.recordId);

        // check if record does not exists
        if(!record) {
            return res.status(404).json({errors: [{msg: 'Record does not exists'}]});
        }

        res.json(record);
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: 'Server error'});
    }
});

// @route    PUT /api/record/edit/:recordId
// @desc     update record
// @access   private
router.put('/edit/:recordId', [auth,
    check('name', 'Name is required').notEmpty(),
    check('department', 'Department is required').notEmpty(),
    check('itemQuantity', 'Item quantity must be a number').isNumeric(),
    check('studentNumber', 'Student Number is required').notEmpty(),
    check('contact', 'Contact Number is required').notEmpty()
], async (req, res) => {
    // get errors
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, department, itemQuantity, studentNumber, contact} = req.body;

    try {
        // find record
        const record = await Record.findById(req.params.recordId);

        // check if record does not exists
        if(!record) {
            return res.status(404).json({errors: [{msg: 'Record does not exists'}]});
        }

        // find item
        const item = await Item.findById(record.itemId);

        // update quantity
        item.quantity += record.itemQuantity;

        // check if not enough stocks
        if(item.quantity < itemQuantity) {
            return res.status(400).json({errors: [{msg: 'Not enough stocks'}]});
        }

        // reduce quantity
        item.quantity -= itemQuantity;

        // save item
        await item.save();

        // update record
        record.name = name;
        record.department = department;
        record.itemQuantity = itemQuantity;
        record.studentNumber = studentNumber;
        record.contact = contact;

        // save record
        await record.save();

        res.json(record);
    } catch(err) {
        console.error(err);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    PUT /api/record/return/:recordId
// @desc     return item
// @access   private
router.put('/return/:recordId', auth, async (req, res) => {
    try {
        // find record
        const record = await Record.findById(req.params.recordId);

        // check if record does not exists
        if(!record) {
            return res.status(404).json({errors: [{msg: 'Record does not exists'}]});
        }

        // find item
        const item = await Item.findById(record.itemId);

        // update quantity
        item.quantity += record.itemQuantity;

        // save item
        await item.save();

        // update record
        record.status = 'Returned';
        record.dateReturned = Date.now();

        // save record
        await record.save();

        res.json(record);
    } catch(err) {
        console.error(err);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    DELETE /api/record/:recordId
// @desc     delete record
// @access   private
router.delete('/:recordId', auth, async (req, res) => {
    try {
        // find record
        const record = await Record.findById(req.params.recordId);

        // check if record does not exists
        if(!record) {
            return res.status(404).json({errors: [{msg: 'Record does not exists'}]});
        }

        if(record.status !== 'Returned') {
            // find item
            const item = await Item.findById(record.itemId);

            // update quantity
            item.quantity += record.itemQuantity;

            // save item
            await item.save();
        }

        // delete record
        await record.delete();

        res.json({msg: 'Deleted'});
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: 'Server error'});
    }
});

module.exports = router;