import { IFacebookAuthentication } from '@/domain/feature'

class FacebookAuthenticationService {
  constructor(
    private readonly loadFacebookUserApi: ILoadFacebookUserApi
  ) { }

  async perform(params: IFacebookAuthentication.Params): Promise<void> {
    await this.loadFacebookUserApi.loadUser(params)
  }
}

interface ILoadFacebookUserApi {
  loadUser: (params: ILoadFacebookUserByTokenApi.Params) => Promise<void>
}

namespace ILoadFacebookUserByTokenApi {
  export type Params = {
    token: string
  }
}

class LoadFacebookUserApiSpy implements ILoadFacebookUserApi {
  token?: string

  async loadUser(params: ILoadFacebookUserByTokenApi.Params): Promise<void> {
    this.token = params.token
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
})
