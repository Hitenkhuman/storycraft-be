const validation = require('../../util/validation');

/**
 * Class represents validations for image upload
 */
class StoryValidator extends validation {
    constructor(locale) {
        super(locale);
        this.__ = locale;
    }

    /**
     * @desc This function is being used to validate upload file
     */
    validateStory(body) {
        const {
            id, title, description, acceptanceCriteria, positiveTestCase, negativeTestCase
        } = body;
        super.id(id);
        super.field(title, 'title');
        super.field(description, 'description');
        super.field(acceptanceCriteria, 'acceptanceCriteria');
        super.field(positiveTestCase, 'positiveTestCase');
        super.field(negativeTestCase, 'negativeTestCase');
    }
}

module.exports = StoryValidator;
