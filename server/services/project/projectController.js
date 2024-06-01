
const ProjectService = require('./projectService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for List Project.
 */
class ProjectController {
    /**
     * @desc This function is being used to list projects
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async listProject(req, res) {
        try {
            const data = await ProjectService.listProject(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to edit projects
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async editProject(req, res) {
        try {
            const data = await ProjectService.editProject(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.PROJECT_UPDATE_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to view projects
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async viewProject(req, res) {
        try {
            const data = await ProjectService.viewProject(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to delete projects
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async deleteProject(req, res) {
        try {
            const data = await ProjectService.deleteProject(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.PROJECT_DELETE_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = ProjectController;
