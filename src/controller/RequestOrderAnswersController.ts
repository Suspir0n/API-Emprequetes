import { BaseController } from './BaseController'
import { Request } from 'express'
import { RequestOrderAnswers } from '../entity/RequestOrderAnswers'

export class RequestOrderAnswersController extends BaseController<RequestOrderAnswers> {
    
    constructor(){
        super(RequestOrderAnswers, false);
    }

    async all(request: Request){
        let { orderUid } = request.params;
        if(!orderUid) return { status: 400, errors: ['Informe o codigo da requisição']};
        return this.repository.find({
           requestOrder: orderUid
        });
    }
    async save(request: Request) {
        let _requestAnswers = <RequestOrderAnswers>request.body;

        super.isRequired(_requestAnswers.answers, 'Informe a resposta da Pergunta');
        super.isRequired(_requestAnswers.question, 'OInforme qual é a questão');
        super.isRequired(_requestAnswers.requestOrder, 'Informe a requisição');

        super.save(_requestAnswers, request);
    }

}
