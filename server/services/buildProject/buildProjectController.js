
const BuildProjectService = require('./buildProjectService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for building project.
 */
class BuildProjectController {
    /**
     * @desc This function is being used for build project
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async buildProject(req, res) {
        try {
            const data = await BuildProjectService.buildProject(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.PROJECT_BUILD_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, error.message);
        }
    }
}

module.exports = BuildProjectController;
