import { AccessToken } from '@/domain/models'

describe('AccessToken', () => {
  // should create with a velue
  it('deve criar com um valor', () => {
    const sut = new AccessToken('any_value')

    expect(sut).toEqual({ value: 'any_value' })
  })

  // should expire in 1800000 ms
  it('deve expirar em 1800000 ms', () => {
    expect(AccessToken.expirationInMs).toBe(1800000)
  })
})
