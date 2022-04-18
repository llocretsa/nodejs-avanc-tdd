import { ILoadFacebookUserApi } from '@/data/contracts/apis'
import { ICreateFacebookAccountRepository, ILoadUserAccountRepository } from '@/data/contracts/repos'
import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'

import { mock, MockProxy } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  let facebookApi: MockProxy<ILoadFacebookUserApi>
  let userAccountRepo: MockProxy<ILoadUserAccountRepository & ICreateFacebookAccountRepository>
  let sut: FacebookAuthenticationService
  const token = 'any_token'

  beforeEach(() => {
    facebookApi = mock()
    facebookApi.loadUser.mockResolvedValue({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    userAccountRepo = mock()
    sut = new FacebookAuthenticationService(
      facebookApi,
      userAccountRepo
    )
  })

  // should call LoadFacebookUserApi with correct params
  it('deve chamar LoadFacebookUserApi com parâmetros corretos', async () => {
    await sut.perform({ token })

    expect(facebookApi.loadUser).toHaveBeenCalledWith({ token })
    expect(facebookApi.loadUser).toHaveBeenCalledTimes(1)
  })

  // should return AuthenticationError when LoadFacebookUserApi returns undefined
  it('deve retornar AuthenticationError quando LoadFacebookUserApi retornar undefined', async () => {
    facebookApi.loadUser.mockResolvedValueOnce(undefined)

    const authResult = await sut.perform({ token })

    expect(authResult).toEqual(new AuthenticationError())
  })

  // should call LoadUserAccountRepo when LoadFacebookUserApi returns data
  it('deve chamar LoadUserAccountRepo quando LoadFacebookUserApi retornar dados', async () => {
    await sut.perform({ token })

    expect(userAccountRepo.load).toHaveBeenCalledWith({ email: 'any_fb_email' })
    expect(userAccountRepo.load).toHaveBeenCalledTimes(1)
  })

  // should call CreateUserAccountRepo when LoadUserAccountRepo returns undefined
  it('deve chamar CreateUserAccountRepo quando LoadUserAccountRepo retornar undefined', async () => {
    userAccountRepo.load.mockResolvedValueOnce(undefined)

    await sut.perform({ token })

    expect(userAccountRepo.createFromFacebook).toHaveBeenCalledWith({
      name: 'any_fb_name',
      email: 'any_fb_email',
      facebookId: 'any_fb_id'
    })
    expect(userAccountRepo.createFromFacebook).toHaveBeenCalledTimes(1)
  })
})
