import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { AuthenticationError } from '@/domain/errors'
import { IFacebookAuthentication } from '@/domain/feature'

export class FacebookAuthenticationService {
  constructor(
    private readonly loadFacebookUserApi: ILoadFacebookUserApi
  ) { }

  async perform(params: IFacebookAuthentication.Params): Promise<AuthenticationError> {
    await this.loadFacebookUserApi.loadUser(params)
    return new AuthenticationError()
  }
}
