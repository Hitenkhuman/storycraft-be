
const AddProjectService = require('./addProjectService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for adding project.
 */
class AddProjectController {
    /**
     * @desc This function is being used for add project
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async addProject(req, res) {
        try {
            const data = await AddProjectService.addProject(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.PROJECT_ADD_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = AddProjectController;
