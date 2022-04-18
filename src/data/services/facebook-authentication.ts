import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { ILoadUserAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { IFacebookAuthentication } from '@/domain/feature'

export class FacebookAuthenticationService {
  constructor(
    private readonly loadFacebookUserApi: ILoadFacebookUserApi,
    private readonly loadUserAccountRepo: ILoadUserAccountRepository
  ) { }

  async perform(params: IFacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.loadFacebookUserApi.loadUser(params)
    if (fbData !== undefined) {
      await this.loadUserAccountRepo.load({ email: fbData.email })
    }
    return new AuthenticationError()
  }
}
