/**
 * This file is used to story API's routes.
 * @name storyRoutes
 */
const router = require('express').Router();
const StoriesController = require('../services/stories/storyController');


router.get('/', StoriesController.listStories);
router.get('/details', StoriesController.viewStory);
router.put('/', StoriesController.editStory);
router.delete('/', StoriesController.deleteStory);

module.exports = router;
