import * as mongoose from 'mongoose';
import {ContactSchema} from '../models/crmModel';
import {Request, Response} from 'express';
import {ContactService} from "../service/contact";
import {Container, Inject, Singleton} from "typescript-ioc";
import {ResponseResult} from "../dto/response";
import {BaseResource} from "./base_resource";


const Contact = mongoose.model('Contact', ContactSchema);
const Transaction = require('mongoose-transactions')
const contactService:ContactService = new ContactService();

export class ContactController extends BaseResource{

    constructor() {

        super();
        console.log( contactService);
    }

    public addNewContact(req: Request, res: Response) {
        let newContact = new Contact(req.body);

        const transaction = new Transaction()
        transaction.insert('Contact', newContact)
        transaction.run();
        // newContact.save((err, contact) => {
        //     if(err){
        //         res.send(err);
        //     }
        //     res.json(contact);
        // });
        res.json(newContact);
    }

     getContacts(req: Request, res: Response) : any{

        // Container.get(ContactService).findAll().then(data => {
        //     res.json(data);
        // })

         console.log(contactService);
         contactService.findAll().then(data => {
             super.buildResponse(res, data)
        });


        // Contact.find({}, (err, contacts) => {
        //     console.log(contacts)
        //     if (err) {
        //         res.send(err);
        //     }
        //     contacts = contacts.map(contact => {
        //         var obj =
        //             {
        //                 firstName: contact.firstName,
        //                 lastName: contact.lastName
        //             }
        //         return obj;
        //     })
        //     // contacts = contacts.filter(contact => contact.firstName=="b");
        //     res.json(contacts);
        // });
    }

    public getContactWithID(req: Request, res: Response) {
        contactService.getContactWithID(req.params.contactId).then(data=>{
            super.buildResponse(res, data)
        })
    }

    public updateContact(req: Request, res: Response) {

        Contact.findOneAndUpdate({_id: req.params.contactId}, req.body, {new: true}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json(contact);
        });
    }

    public deleteContact(req: Request, res: Response) {
        Contact.remove({_id: req.params.contactId}, (err, contact) => {
            if (err) {
                res.send(err);
            }
            res.json({message: 'Successfully deleted contact!'});
        });
    }

}