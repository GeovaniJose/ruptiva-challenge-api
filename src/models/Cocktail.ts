import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm'

import User from './User'

@Entity('cocktails')
class Cocktail {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar')
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column('varchar')
  name: string

  @Column('integer', { default: 1 })
  alcohol_level: number

  @Column('varchar', { array: true })
  ingredients: string[]

  @Column('varchar')
  image: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Cocktail
