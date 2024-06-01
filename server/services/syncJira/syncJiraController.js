
const SyncJiraService = require('./syncJiraService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for List SyncJira.
 */
class SyncJiraController {
    /**
     * @desc This function is being used authenticate Jira account
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async verifyJira(req, res) {
        try {
            const data = await SyncJiraService.verifyJira(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.JIRA_SYNC_SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = SyncJiraController;
