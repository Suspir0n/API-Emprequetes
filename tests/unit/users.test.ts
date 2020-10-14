import { expect } from 'chai'

describe('users behaviors', () => {
  it('user Creation', () => {
    let user: IDBUser = createNewUser({nome: "ismael", idade: 14})
    expect(user.id).to.equal(1)
  })
})

export interface IUser {
  nome: string,
  idade: number
}

export interface IDBUser {
  id: number,
  nome: string,
  idade: number
}

function createNewUser(user: IUser): IDBUser {
   return {
     id: 1,
     nome: user.nome,
     idade: user.idade
   }
}
