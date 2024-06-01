/**
 * @name story model
 */
const appMongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const schema = new appMongoose.Schema({
    projectId: {
        type: appMongoose.Schema.Types.ObjectId,
        ref: 'project'
    },
    key: {
        type: String
    },
    index: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String,
        trim: true
    },
    acceptanceCriteria: {
        type: String,
        trim: true
    },
    edgeCases: {
        type: String
    },
    positiveTestCase: {
        type: String
    },
    negativeTestCase: {
        type: String
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

module.exports = appMongoose.model('story', schema);
