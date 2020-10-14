import { ServiceProvider } from '../entity/ServiceProvider'
import { BaseController } from './BaseController'
import { Request } from 'express'
import * as md5 from 'md5'
import { FileHelper } from '../helpers/fileHelper'

export class ServiceProviderController extends BaseController<ServiceProvider> {
    
    constructor(){
        super(ServiceProvider, true);
    }

    private validationDefault(_serviceProvider: ServiceProvider): void{
        super.isRequired(_serviceProvider.name, 'O Nome é obrigatório');
        super.isRequired(_serviceProvider.photo, 'A Foto é obrigatório');
        super.isRequired(_serviceProvider.email, 'O E-mail é obrigatório');
        super.isRequired(_serviceProvider.phone, 'O Telefone é obrigatório');
        super.isRequired(_serviceProvider.categoriesCare, 'Informe as categorias atendidas');
        super.isRequired(_serviceProvider.citiesCare, 'Informe as cidades atendidas');
        super.isRequired(_serviceProvider.zipCode, 'Informe seu CEP');
        super.isRequired(_serviceProvider.state, 'Informe seu Estado');
    }

    async save(request: Request) {
        let _serviceProvider = <ServiceProvider>request.body;
        this.validationDefault(_serviceProvider);

        if(_serviceProvider.photo){
            let pictureCreateResult = await FileHelper.writePicture(_serviceProvider.photo);
            if(pictureCreateResult){
                _serviceProvider.photo = pictureCreateResult;
            }
        }

        delete _serviceProvider.password;

        super.save(_serviceProvider, request);
    }

    async createServiceProvider(request: Request) {
        let _serviceProvider = <ServiceProvider>request.body;
        let { confirmPassword } = request.body;

        this.validationDefault(_serviceProvider);
        super.isRequired(_serviceProvider.password, 'A Senha é obrigatória');
        super.isRequired(confirmPassword, 'A Confirmação da Senha é obrigatória');
        super.isTrue((_serviceProvider.password != confirmPassword), 'A senha e a confirmação de senha estão diferentes');

        if(_serviceProvider.photo){
            let pictureCreateResult = await FileHelper.writePicture(_serviceProvider.photo);
            if(pictureCreateResult){
                _serviceProvider.photo = pictureCreateResult;
            }
        }
        
        if(_serviceProvider.password){
            _serviceProvider.password = md5(_serviceProvider.password);
        }

        super.save(_serviceProvider, request, true);
    }

}
