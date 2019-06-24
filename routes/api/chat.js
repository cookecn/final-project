const router = require("express").Router();
const chatController = require('../../controllers/chatController');


router.route('/messages')
    .get(chatController.findAll)
    .post(chatController.create);

router.route('/messages/:id')
    .get(chatController.findById)
    .post(chatController.create)
    .delete(chatController.remove);

module.exports = router;