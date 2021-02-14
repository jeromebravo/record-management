const express = require('express');
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const Record = require('../models/Record');
const router = express.Router();

// @route    POST /api/record
// @desc     create new record
// @access   private
router.post('/', [auth,
    check('name', 'Name is required').notEmpty(),
    check('department', 'Department is required').notEmpty(),
    check('item', 'Item is required').notEmpty(),
], async (req, res) => {
    // get errors
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // create record
        const record = await Record.create(req.body);

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

// @route    PUT /api/record/:recordId
// @desc     update record
// @access   private
router.put('/edit/:recordId', [auth,
    check('name', 'Name is required').notEmpty(),
    check('department', 'Department is required').notEmpty(),
    check('item', 'Item is required').notEmpty(),
], async (req, res) => {
    // get errors
    const errors = validationResult(req);

    // check if there are errors
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {name, department, item} = req.body;

    try {
        // find record
        const record = await Record.findById(req.params.recordId);

        // check if record does not exists
        if(!record) {
            return res.status(404).json({errors: [{msg: 'Record does not exists'}]});
        }

        // update record
        record.name = name;
        record.department = department;
        record.item = item;

        // save record
        await record.save();

        res.json(record);
    } catch(err) {
        console.error(err);
        res.status(500).json({errors: [{msg: 'Server error'}]});
    }
});

// @route    PUT /api/record/:recordId
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

        // update record
        record.status = 'Returned';

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

        // delete record
        await record.delete();

        res.json({msg: 'Deleted'});
    } catch(err) {
        console.error(err);
        res.status(500).json({msg: 'Server error'});
    }
});

module.exports = router;