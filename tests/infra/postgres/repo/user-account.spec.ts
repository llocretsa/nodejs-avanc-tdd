import { ILoadUserAccountRepository } from '@/data/contracts/repos'

import { newDb } from 'pg-mem'
import { Column, Entity, getRepository, PrimaryGeneratedColumn } from 'typeorm'

class PgUserAccountRepository implements ILoadUserAccountRepository {
  async load(params: ILoadUserAccountRepository.Params): Promise<ILoadUserAccountRepository.Result> {
    const pgUserRepo = getRepository(PgUser)
    const pgUser = await pgUserRepo.findOne({ email: params.email })
    if (pgUser !== undefined) {
      return {
        id: pgUser!.id.toString(),
        name: pgUser.name ?? undefined
      }
    }
    return undefined
  }
}

@Entity({ name: 'usuarios' })
export class PgUser {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ name: 'nome', nullable: true })
  name?: string

  @Column()
  email!: string

  @Column({ name: 'id_facebook', nullable: true })
  facebook?: number
}


describe('PgUserAccountRepository', () => {
  describe('load', () => {

    // should return an account if email exists
    it('deve retornar uma conta se o email existir', async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgUser]
      })
      await connection.synchronize()
      const pgUserRepo = getRepository(PgUser)
      await pgUserRepo.save({ email: 'existing_email' })
      const sut = new PgUserAccountRepository()

      const account = await sut.load({ email: 'existing_email' })

      expect(account).toEqual({ id: '1' })
      await connection.close()
    })

    // should return undefined if email does not exists
    it('deve retornar undefined se o email não existir', async () => {
      const db = newDb()
      const connection = await db.adapters.createTypeormConnection({
        type: 'postgres',
        entities: [PgUser]
      })
      await connection.synchronize()
      const sut = new PgUserAccountRepository()

      const account = await sut.load({ email: 'new_email' })

      expect(account).toBeUndefined()
      await connection.close()
    })
  })
})
