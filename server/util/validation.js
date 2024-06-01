const GeneralError = require('../util/GeneralError');
const REQUIRED = 'FIELD_REQUIRED';
const INVALID = 'FIELD_NOT_VALID';

/**
 * @name alidator
 */
class Validator {
    constructor(locale) {
        this.NOT_VALID = INVALID;
        this.REQUIRED = REQUIRED;

        if (locale) {
            this.__ = locale;
        }
    }

    /**
     * @desc This function is being used to validate id
     * @param {string} id id
     */
    id(id) {
        if (!id) {
            throw new GeneralError(this.__(REQUIRED, 'id'), 400);
        }
    }

    /**
     * @desc This function is being used to validate template name
     * @param {string} templateName templateName
     */
    templateName(templateName) {
        if (!templateName) {
            throw new GeneralError(this.__(REQUIRED, 'templateName'), 400);
        }

        if (!CONSTANTS.REGEX.templateName.test(templateName)) {
            throw new GeneralError(this.__(INVALID, 'templateName'), 400);
        }
    }

    /**
     * @desc This function is being used to validate template name
     * @param {string} subject SUBJECT
     */

    subject(subject) {
        if (!subject) {
            throw new GeneralError(this.__(REQUIRED, 'Subject'), 400);
        }

        if (!CONSTANTS.REGEX.SUBJECT.test(subject)) {
            throw new GeneralError(this.__(INVALID, 'Subject'), 400);
        }
    }

    /**
     * @desc This function is being used to validate picture fileType
     * @param {String} mimeType mimeType
     */
    fileType(mimeType) {
        if (!mimeType || CONSTANTS.UPLOAD_IMAGE.ALLOWED_TYPE.indexOf(mimeType) === -1) {
            throw {
                message: MESSAGES.INVALID_FILE_TYPE,
                statusCode: 400
            };
        }
    }

    /**
     * @desc This function is being used to validate picture file size in bytes
     * @param {Number} fileSize fileSize
     */
    fileSize(fileSize) {
        if (!fileSize
            || fileSize < CONSTANTS.UPLOAD_IMAGE.MIN_SIZE
            || fileSize > CONSTANTS.UPLOAD_IMAGE.MAX_SIZE) {
            throw {
                message: MESSAGES.INVALID_FILE_SIZE,
                statusCode: 400
            };
        }
    }

    /**
     * @desc This function is being used to check field
     * @param {string} field field
     */
    field(field, key) {
        if (!field) {
            throw new GeneralError(this.__(REQUIRED, key), 400);
        }
    }


}

module.exports = Validator;
