/**
 * @name project model
 */
const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
    projectName: {
        type: String,
        unique: true
    },
    systemActor: {
        type: String
    },
    actionMap: {
        type: String,
        trim: true
    },
    mindMap: {
        type: String,
        trim: true
    },
    infoArchitecture: {
        type: String
    },
    systemActorDesc: {
        type: String
    },
    actionMapDesc: {
        type: String,
        trim: true
    },
    mindMapDesc: {
        type: String,
        trim: true
    },
    infoArchitectureDesc: {
        type: String
    },
    userStory: {
        type: String
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Uploaded', 'Processing', 'Completed', 'Failed'],
        default: 'Uploaded'
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

schema.plugin(mongoosePaginate);
schema.plugin(aggregatePaginate);

module.exports = appMongoose.model('project', schema);
