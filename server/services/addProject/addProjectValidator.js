const GeneralError = require('../../util/GeneralError');
const validation = require('../../util/validation');

/**
 * Class represents validations for image upload
 */
class AddProjectValidator extends validation {
    constructor(locale) {
        super(locale);
        this.__ = locale;
    }

    /**
     * @desc This function is being used to validate upload file
     */
    async validateImageUpload(file, field) {
        if (!file) {
            throw new GeneralError(this.__('FIELD_REQUIRED', field), 400);
        }
        super.fileType(file.mimetype);
        super.fileSize(file.size);
    }

    async validateImagePayload(files) {
        files?.actionMap?.length && await this.validateImageUpload(files.actionMap[0], 'actionMap');
        files?.mindMap?.length && await this.validateImageUpload(files.mindMap[0], 'mindMap');
        files?.infoArchitecture?.length && await this.validateImageUpload(files.infoArchitecture[0], 'infoArchitecture');
        files?.systemActor?.length && await this.validateImageUpload(files.systemActor[0], 'systemActor');
    }

    validateProject(body, id) {
        const { projectName, description, userStory } = body;
        if (id) {
            super.id(id);
        }
        super.field(projectName, 'projectName');
        super.field(userStory, 'userStory');
        super.field(description, 'description');
    }
}

module.exports = AddProjectValidator;
