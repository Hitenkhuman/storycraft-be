const Project = require('../../models/project.model');
const mongoose = require('mongoose');
const GeneralError = require('../../util/GeneralError');
const AddProjectValidator = require('../addProject/addProjectValidator');
const CONSTANTS = require('../../util/constants');

/**
 * Class represents services for List Project.
 */
class ProjectService {
    /**
     * @desc This function is being used to list projects
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async listProject(req) {
        const { sort, sortBy, search, status, all } = req.query;
        const page = req.query.page ?? 1;
        const limit = req.query.limit ?? 9;
        let sortParam = { createdAt: -1 };
        const query = {
            isDeleted: false
        };
        if (sort && sortBy) {
            sortParam = {};
            sortParam[sortBy] = sort;
        }
        if (status) {
            query.status = status;
        }

        if (search) {
            query.projectName = {
                $regex: new RegExp(`.*${search}.*`, 'i')
            };
        }
        const options = {
            page,
            limit,
            sort: sortParam
        };
        if (all === 'true') {
            return {
                docs: await Project.find(query).sort({ createdAt: -1 })
            };
        }
        return await Project.paginate(query, options);
    }

    /**
     * @desc This function is being used to view a project by ID
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async viewProject(req) {
        const { id } = req.query;
        const project = await Project.findById(id);
        if (!project) {
            throw new GeneralError(MESSAGES.PROJECT_NOT_FOUND, 404);
        }
        const { systemActor, actionMap, mindMap, infoArchitecture } = project;
        project.systemActor = this.generatePublicViewUrl(systemActor, 'system-actor');
        project.actionMap = this.generatePublicViewUrl(actionMap, 'action-map');
        project.mindMap = this.generatePublicViewUrl(mindMap, 'mind-map');
        project.infoArchitecture = this.generatePublicViewUrl(infoArchitecture, 'info-arch');
        return project;
    }

    /**
     * @desc This function is being used to edit a project by ID
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async editProject(req, locale) {
        const { id, projectName, description, userStory } = req.body;

        const validator = new AddProjectValidator(locale);
        validator.validateProject(req.body, id);
        const data = await Project.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, {
            $set: {
                projectName,
                description,
                userStory
            }
        }, { new: true });
        if (!data) {
            throw new GeneralError(MESSAGES.PROJECT_NOT_FOUND, 404);
        }
        return data;
    }

    /**
     * @desc This function is being used to delete a project
     * @param {Object} req Request
     * @param {Object} res Response
     */
    static async deleteProject(req) {
        const { id } = req.body;
        const project = await Project.findOne({ _id: new mongoose.Types.ObjectId(id) });
        if (!project) {
            throw new GeneralError(MESSAGES.PROJECT_NOT_FOUND, 404);
        }
        await Project.updateOne({ _id: new mongoose.Types.ObjectId(id) }, {
            isDeleted: true
        });
    }

    static generatePublicViewUrl(fileName, folder) {
        const url = process.env.BASE_URL;
        return (fileName === CONSTANTS.NO_PREVIEW_IMAGE || !fileName) ? CONSTANTS.NO_PREVIEW_IMAGE :
            `${url}/${folder}/${fileName}`;
    }
}

module.exports = ProjectService;
