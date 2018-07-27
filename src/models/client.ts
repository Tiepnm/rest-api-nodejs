import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const Client = new Schema({
    clientId: {
        type: String

    },
    clientSecret: {
        type: String

    }

});