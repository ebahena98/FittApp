const express = require('express');
const router = express.Router();
const path = require('path');


// //DEFAULT ROUTE (INDEX.HTML)
// router.get('^/$|/index(.html)?', (req, res) => {
//     res.status(200).sendFile(path.join(__dirname, '..', 'public', 'subdir', 'index.html'));
// });

router.get('/test(.html)?', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '..', 'public', 'subdir', 'test.html'));
});



module.exports = router;