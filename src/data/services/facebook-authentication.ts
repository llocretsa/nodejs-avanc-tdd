import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { ICreateFacebookAccountRepository, ILoadUserAccountRepository } from '@/data/contracts/repos'
import { AuthenticationError } from '@/domain/errors'
import { IFacebookAuthentication } from '@/domain/feature'

export class FacebookAuthenticationService {
  constructor(
    private readonly facebookApi: ILoadFacebookUserApi,
    private readonly userAccountRepo: ILoadUserAccountRepository & ICreateFacebookAccountRepository
  ) { }

  async perform(params: IFacebookAuthentication.Params): Promise<AuthenticationError> {
    const fbData = await this.facebookApi.loadUser(params)
    if (fbData !== undefined) {
      await this.userAccountRepo.load({ email: fbData.email })
      await this.userAccountRepo.createFromFacebook(fbData)
    }
    return new AuthenticationError()
  }
}
