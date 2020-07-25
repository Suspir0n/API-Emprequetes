import { Request, Responde } from "express";
import { verify } from 'jsonwebtoken';
import config from '../configuration/config';

export default async(req: Request, res: Responde, next: Function) => {
   let token = req.body.token || req.query.token || req.headers['x-token-access'];
   let publicRoutes = <Array<String>>config.publicRoutes;
   let isPublicRoutes: boolean = false;
   
   publicRoutes.forEach(url => {
       let isPublic = req.url.includes(url);
       if(isPublic)
          isPublicRoutes = true;
   });

   if(isPublicRoutes){
      next();
   }else{
        if(token){
            try{
                let _userAuth = verify(token, config.secretyKey);
                req.userAuth = _userAuth;
                next();
            }catch (error){
                res.status(401).send({ messege: 'Token informado é invalido'});
                return;
            }
        }else{
            res.status(401).send({ messege: 'Para acessar esse recurso voçê precisa estar autenticado'});
        }
    }      
}