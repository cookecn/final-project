const router = require('express').Router();
const newsController = require('../../controllers/newsController');


    router.route('/news')
    .get(newsController.findAll)
    .post(newsController.create);

    router.route('/news/:id')
    .get(newsController.findById)
    .post(newsController.update)
    .delete(newsController.remove);



module.exports = router;