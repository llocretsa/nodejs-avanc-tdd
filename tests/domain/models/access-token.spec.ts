import { AccessToken } from '@/domain/models'

describe('AccessToken', () => {
  // should create with a velue
  it('deve criar com um valor', () => {
    const sut = new AccessToken('any_value')

    expect(sut).toEqual({ value: 'any_value' })
  })
})
