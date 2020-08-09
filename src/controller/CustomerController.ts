import { Customer } from "../entity/Customer";
import { BaseController } from "./BaseController";
import { Request, Responde } from 'express';
import * as md5 from 'md5';
import { FileHelper } from "../helpers/fileHelper";

export class CustomerController extends BaseController<Customer> {
    
    constructor(){
        super(Customer, true);
    }

    async save(request: Request) {
        let _customer = <Customer>request.body;
        super.isRequired(_customer.name, 'O Nome é obrigatório');
        super.isRequired(_customer.photo, 'A Foto é obrigatório');
        super.isRequired(_customer.email, 'O E-mail é obrigatório');
        super.isRequired(_customer.phone, 'O Telefone é obrigatório');

        if(_customer.photo){
            let pictureCreateResult = await FileHelper.writePicture(_customer.photo);
            if(pictureCreateResult){
                _customer.photo = pictureCreateResult;
            }
        }
        delete _customer.password;

        super.save(_customer, request);
    }

    async createCustomer(request: Request) {
        let _customer = <Customer>request.body;
        let { confirmPassword } = request.body;

        super.isRequired(_customer.name, 'O Nome é obrigatório');
        super.isRequired(_customer.photo, 'A Foto é obrigatório');
        super.isRequired(_customer.email, 'O E-mail é obrigatório');
        super.isRequired(_customer.phone, 'Telefone é obrigatório');
        super.isRequired(_customer.password, 'A Senha é obrigatória');
        super.isRequired(confirmPassword, 'A Confirmação da Senha é obrigatória');
        super.isTrue((_customer.password != confirmPassword), 'A senha e a confirmação de senha estão diferentes');
        
        if(_customer.photo){
            let pictureCreateResult = await FileHelper.writePicture(_customer.photo);
            if(pictureCreateResult){
                _customer.photo = pictureCreateResult;
            }
        }

        if(_customer.password){
            _customer.password = md5(_customer.password);
        }

        super.save(_customer, request, true);
    }

}
