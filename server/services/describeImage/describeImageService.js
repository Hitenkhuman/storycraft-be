const axios = require('axios');
const AsticaConfig = require('../../util/asticaConfig');
const GeneralError = require('../../util/GeneralError');
const { DESCRIBE_IMAGE_PROMPTS, VALID_TAGS } = require('../../util/constants');

/**
 * Class represents services for descibe the image.
 */
class DescribeImageService {
    /**
     * @desc This function is being used to descibe the system actor image
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async describeImage(req, res, prompt) {
        try {
            const { apiKey, modelVersion, visionParams, promptLength } = AsticaConfig;
            const { mimetype, buffer } = req.file;
            const imageExtension = mimetype.split('/')[1];
            const asticaInput = `data:image/${imageExtension};base64,${buffer.toString('base64')}`;
            const apiUrl = process.env.ASTICA_API_URL;
            const requestData = {
                modelVersion,
                visionParams,
                tkn: apiKey,
                input: asticaInput,
                gpt_prompt: prompt,
                prompt_length: promptLength
            };
            const response = await axios({
                method: 'post',
                url: apiUrl,
                data: requestData,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data && response.data.status === 'error') {
                throw new Error(response.data.error);
            }
            return response.data;
        } catch (error) {
            CONSOLE_LOGGER.info('Error:', error);
            return error;
        }
    }

    /**
     * @desc This function is being used to descibe the action map image
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async describeActionMap(req, res) {
        const response = await this.describeImage(req, res, DESCRIBE_IMAGE_PROMPTS.PROMPT_1);
        if (this.validateResponse(response)) {
            return response;
        } else {
            throw new GeneralError(MESSAGES.INVALID_ACTION_MAP, 400);
        }
    }

    /**
     * @desc This function is being used to descibe the Mind Map image
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async describeMindMap(req, res) {
        const response = await this.describeImage(req, res, DESCRIBE_IMAGE_PROMPTS.PROMPT_2);
        if (await this.validateResponse(response)) {
            return response;
        } else {
            throw new GeneralError(MESSAGES.INVALID_ACTION_MAP, 400);
        }
    }

    /**
     * @desc This function is being used to descibe the System Actor image
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async describeSystemActor(req, res) {
        const response = await this.describeImage(req, res, DESCRIBE_IMAGE_PROMPTS.PROMPT_3);
        if (await this.validateResponse(response)) {
            return response;
        } else {
            throw new GeneralError(MESSAGES.INVALID_ACTION_MAP, 400);
        }
    }

    /**
     * @desc This function is being used to descibe the Info Architecture image
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async describeInfoArch(req, res) {
        const response = await this.describeImage(req, res, DESCRIBE_IMAGE_PROMPTS.PROMPT_4);
        if (await this.validateResponse(response)) {
            return response;
        } else {
            throw new GeneralError(MESSAGES.INVALID_ACTION_MAP, 400);
        }
    }

    /**
     * @desc This function is being used to validate response
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static validateResponse(response) {
        return (
            Array.isArray(response.tags) &&
            response.tags.some(tag => tag.name === VALID_TAGS.TEXT) &&
            response.tags.some(tag => tag.name === VALID_TAGS.DIAGRAM)
        );
    }
}

module.exports = DescribeImageService;
