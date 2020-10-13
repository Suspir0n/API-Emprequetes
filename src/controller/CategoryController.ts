import { Category } from '../entity/Category'
import { BaseController } from './BaseController'
import { Request } from 'express'

export class CategoryController extends BaseController<Category> {
    constructor () {
        super(Category, true)
    }

    async save (request: Request) {
        let _category = <Category>request.body
        super.isRequired(_category.name, 'O Nome da categoria é obrigatório')
        super.save(_category, request)
    }
}
