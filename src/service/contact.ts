import * as mongoose from 'mongoose';
import {ContactSchema} from "../models/crmModel";

const Contact = mongoose.model('Contact', ContactSchema);

export class ContactService {

    constructor()
    {

    }
    public findAll() : any {
        return Contact.find({});
    }
    public getContactWithID(contactId: string) : any
    {
        return Contact.findById(contactId);
    }

}