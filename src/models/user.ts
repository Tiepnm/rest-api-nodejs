import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const User = new Schema({
    id: {
        type: String

    },
    username: {
        type: String

    },
    password: {
        type: String

    }

});