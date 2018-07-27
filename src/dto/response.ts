
import {ResponseStatus} from "../glossary/response_status";
/**
 * Created by tiepnm on 7/26/2018.
 */
export class ResponseResult<T>
{
    private _status : string;
    private _data: T;
    private _message : string;

    constructor()
    {
        this._message = "success";
        this._status = ResponseStatus.SUCCESS_1;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    get data(): T {
        return this._data;
    }

    set data(value: T) {
        this._data = value;
    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        this._message = value;
    }
}