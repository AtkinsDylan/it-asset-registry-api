const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const {
  getAllAssets,
  getAssetById,
  createAsset,
  updateAsset,
  deleteAsset
} = require('../controllers/assetController');

const validateAsset = [
  body('name').notEmpty().withMessage('Name is required'),
  body('type').notEmpty().withMessage('Type is required'),
  body('status')
    .isIn(['available', 'assigned', 'under repair', 'retired'])
    .withMessage('Status must be available, assigned, under repair or retired'),
  body('serial_number').optional().isString(),
  body('assigned_to').optional().isInt(),
  body('department_id').optional().isInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  }
];

router.get('/', getAllAssets);
router.get('/:id', getAssetById);
router.post('/', validateAsset, createAsset);
router.put('/:id', validateAsset, updateAsset);
router.delete('/:id', deleteAsset);

module.exports = router;