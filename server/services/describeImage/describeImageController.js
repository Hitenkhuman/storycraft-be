const DescribeImageService = require('./describeImageService');
const Utils = require('../../util/utilFunctions');

/**
 * Class represents controller for List Project.
 */
class DescribeImageController {
    /**
     * @desc This function is being used to Describe Action Map Image
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async describeActionMap(req, res) {
        try {
            const data = await DescribeImageService.describeActionMap(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to Describe Mind Map Image
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async describeMindMap(req, res) {
        try {
            const data = await DescribeImageService.describeMindMap(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to Describe System Actor Image
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async describeSystemActor(req, res) {
        try {
            const data = await DescribeImageService.describeSystemActor(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }

    /**
     * @desc This function is being used to Describe Info Architecture Image
     * @param {Object} req Request
     * @param {function} res Response
     */
    static async describeInfoArch(req, res) {
        try {
            const data = await DescribeImageService.describeInfoArch(req, res.__);
            Utils.sendResponse(null, data, res, MESSAGES.SUCCESS);
        } catch (error) {
            Utils.sendResponse(error, null, res, '');
        }
    }
}

module.exports = DescribeImageController;
