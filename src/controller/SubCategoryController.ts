import { SubCategory } from "../entity/SubCategory";
import { BaseController } from "./BaseController";
import { Request, Responde } from 'express';

export class SubCategoryController extends BaseController<SubCategory> {
    
    constructor(){
        super(SubCategory);
    }

    async save(request: Request) {
        let _subCategory = <SubCategory>request.body;
        super.isRequired(_subCategory.name, 'O Nome da SubCategoria é obrigatório');
        super.isRequired(_subCategory.category, 'A Categoria é obrigatório');
        super.isRequired(_subCategory.cost, 'A Custo é obrigatório');
        super.isTrue(isNaN(_subCategory.cost), 'O Custo deve ser um número');
        super.isTrue(_subCategory.cost <= 0, 'O Custo deve ser maior que zero' );
        super.save(_subCategory);
    }

}
