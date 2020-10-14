import { Request, Responde } from 'express'
import { User } from '../entity/User'
import { BaseController } from './BaseController'
import * as md5 from 'md5'
import { sign } from 'jsonwebtoken'
import config from '../configuration/config'

export class UserController extends BaseController<User> {
    constructor(){
        super(User);
    }

    async auth(request: Request, res: Responde) {
        let { email, password } = request.body;
        if (!email || !password)
            return { status: 400, errors: ['Informe o email e a senha para efetuar o login'] };

        let user = await this.repository.findOne({ email: email, password: md5(password) });
        if (user) {
            let _payload = {
                uid: user.uid,
                name: user.name,
                photo: user.photo,
                email: user.email
            }
            res.status(200).send({ message: {
                        user: _payload,
                        token: sign({
                            ..._payload, 
                            tm: new Date().getTime()
                    }, config.secretyKey)
                }
            });
            return;
        } else
            return { status: 404, errors: ['E-mail ou senha inválidos'] }
    }
    async createUser(request: Request){
        let { name, photo, email, isRoot, password, confirmPassword } = request.body;
        super.isRequired(name, 'Informe o nome');
        super.isRequired(photo, 'Selecione uma foto');
        super.isRequired(email, 'Informe o e-mail');
        super.isRequired(password, 'Informe a senha');
        super.isRequired(confirmPassword, 'Informe a confirmação da senha');

        let _user = new User();
        _user.name = name;
        _user.photo = photo;
        _user.email = email;
        if(password != confirmPassword){
            return { status: 400, errors: ['A senha e a confirmação são diferentes!']}
        }
        if(password){
            _user.password = md5(password);
        }
        _user.isRoot = isRoot;

        return super.save(_user, request, true);
    }

    async save(request: Request) {
        let _user = <User>request.body;
        super.isRequired(_user.name, 'O Nome do usuário é obrigatório');
        super.isRequired(_user.photo, 'O Foto do usuário é obrigatória');
        super.isRequired(_user.email, 'O Email do usuário é obrigatório');
        super.isRequired(_user.password, 'O Senha do usuário é obrigatório');
        super.save(_user, request);
    }
}
