const router = require('express').Router();
const messageController = require('../../controllers/messageController');

router.route('/messages')
    .get(messageController.findAll)
    .post(messageController.create);

router.route('/messages/:id')
    .get(messageController.findById)
    .put(messageController.update)
    .delete(messageController.remove);

module.exports = router;