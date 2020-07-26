import { BaseController } from "./BaseController";
import { Request, Responde } from 'express';
import { RequestOrder } from "../entity/RequestOrder";
import { RequestSatus } from "../entity/enum/RequestStatus";

export class RequestOrderController extends BaseController<RequestOrder> {
    
    constructor(){
        super(RequestOrder, false);
    }

    async save(request: Request) {
        let _request = <RequestOrder>request.body;
        super.isRequired(_request.title, 'Informe o titulo do seu pedido');
        super.isRequired(_request.description, 'Informe o que precisa');
        super.isRequired(_request.customer, 'Preciso saber quem é você');
        super.isRequired(_request.subCategory, 'Preciso saber qual a SubCategoria');
        super.isRequired(_request.longlat, 'Preciso saber onde você esta');

        if(!_request.uid){
            _request.statusOrder = RequestSatus.Pending;
        }

        super.save(_request, request);
    }

}