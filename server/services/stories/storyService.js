const { default: mongoose } = require('mongoose');
const Story = require('../../models/story.model');
const Validator = require('../../util/validation');
const GeneralError = require('../../util/GeneralError');
const StoryValidator = require('./storyValidator');
const Project = require('../../models/project.model');

/**
 * Class represents services for List Stories.
 */
class StoriesService {
    /**
   * @desc This function is being used to list Stories
   * @param {Object} req Request
   * @param {Object} res Response
   */
    static async listStories(req, locale) {
        const { id, sort, sortBy, search } = req.query;
        const page = req.query.page ?? 1;
        const limit = req.query.limit ?? 10;
        let sortParam = { index: 1 };
        const validator = new Validator(locale);
        validator.id(id);
        const query = {
            projectId: new mongoose.Types.ObjectId(id),
            isDeleted: false
        };
        if (sort && sortBy) {
            sortParam = {};
            sortParam[sortBy] = sort;
        }

        if (search) {
            query.title = {
                $regex: new RegExp(`.*${search}.*`, 'i')
            };
        }
        const options = {
            page,
            limit,
            sort: sortParam
        };
        return await Story.paginate(query, options);
    }

    /**
   * @desc This function is being used to view a story by ID
   * @param {Object} req Request
   * @param {Object} res Response
   */
    static async viewStory(req, locale) {
        const { id } = req.query;
        const validator = new Validator(locale);
        validator.id(id);
        const story = await Story.findOne({ _id: id });
        if (!story) {
            throw new GeneralError(MESSAGES.STORY_NOT_FOUND, 404);
        }
        const project = await Project.findOne({ _id: story.projectId });
        return { ...story._doc, projectName: project.projectName };
    }

    /**
   * @desc This function is being used to edit a Story by ID
   * @param {Object} req Request
   * @param {Object} res Response
   */
    static async editStory(req, locale) {
        const {
            id, title, description, acceptanceCriteria, positiveTestCase, edgeCases, negativeTestCase
        } = req.body;

        const validator = new StoryValidator(locale);
        validator.validateStory(req.body);

        return await Story.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            {
                $set: {
                    title,
                    description,
                    acceptanceCriteria,
                    positiveTestCase,
                    negativeTestCase,
                    edgeCases: edgeCases ?? ''
                }
            }
        );
    }

    /**
   * @desc This function is being used to delete a Story
   * @param {Object} req Request
   * @param {Object} res Response
   */
    static async deleteStory(req, locale) {
        const { id } = req.body;
        const validator = new Validator(locale);
        validator.id(id);

        const story = await Story.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!story) {
            throw new GeneralError(MESSAGES.STORY_NOT_FOUND, 404);
        }

        return await Story.updateOne(
            { _id: new mongoose.Types.ObjectId(id) },
            {
                isDeleted: true
            }
        );
    }
}

module.exports = StoriesService;
