import {ResponseResult} from "../dto/response";
export class BaseResource
{
    public buildResponse(res: Response, data: string) : any
    {
        console.log("Build-Response")
        var response:ResponseResult<string> = new ResponseResult<string>();
        response.data = data;
        res.json(response);
    }
}