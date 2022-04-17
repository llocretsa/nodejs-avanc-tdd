import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

class LoadFacebookUserApiSpy implements ILoadFacebookUserApi {
  token?: string
  result: undefined

  async loadUser(params: ILoadFacebookUserApi.Params): Promise<ILoadFacebookUserApi.Result> {
    this.token = params.token
    return this.result
  }

}

describe('FacebookAuthenticationService', () => {
  // should call LoadFacebookUserApi with correct params
  it('deve chamar LoadFacebookUserApi com parâmetros corretos', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.token).toBe('any_token')
  })

  // should return AuthenticationError when LoadFacebookUserApi returns undefined
  it('deve retornar AuthenticationError quando LoadFacebookUserApi retornar undefined', async () => {
    const loadFacebookUserApi = new LoadFacebookUserApiSpy()
    loadFacebookUserApi.result = undefined
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
