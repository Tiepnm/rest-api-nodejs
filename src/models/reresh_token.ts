import * as mongoose from 'mongoose';
import {User} from "./user";

const Schema = mongoose.Schema;

export const RefreshToken = new Schema({
    refreshToken: {
        type: String

    },
    expires: {
        type: Date

    },
    clientId: {
        type: String

    },
    expires: {
        type: Date

    },
    user:{
        type: User
    }

});