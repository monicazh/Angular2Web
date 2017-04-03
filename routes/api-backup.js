/**
 * Created by monicaz on 2017-03-26.
 */
const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

module.exports = router;
