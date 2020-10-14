import { Column, Entity, ManyToOne } from 'typeorm'
import { BaseEntity } from './BaseEntity'
import { RequestOrder } from './RequestOrder'
import { Question } from './Question'

@Entity({ name: 'RequestOrderAnswers' })
export class RequestOrderAnswers extends BaseEntity {
    @Column({ type: 'text', nullable: false })
    answers: string

    @ManyToOne(() => RequestOrder, { eager: true })
    requestOrder: RequestOrder

    @ManyToOne(()=> Question, {eager: true})
    question: Question
}
