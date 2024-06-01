
const StoriesService = require('./storyService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for List Stories.
 */
class StoriesController {
    /**
     * @desc This function is being used to list Stories
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async listStories(req, res) {
        try {
            const data = await StoriesService.listStories(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to view Stories
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async viewStory(req, res) {
        try {
            const data = await StoriesService.viewStory(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to edit Stories
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async editStory(req, res) {
        try {
            const data = await StoriesService.editStory(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.EDIT_STORY_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to delete Stories
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async deleteStory(req, res) {
        try {
            const data = await StoriesService.deleteStory(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.STORY_DELETE_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = StoriesController;
