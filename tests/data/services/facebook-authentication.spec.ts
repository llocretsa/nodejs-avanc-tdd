import { FacebookAuthenticationService } from '@/data/services'
import { AuthenticationError } from '@/domain/errors'
import { ILoadFacebookUserApi } from '../../../src/data/contracts/apis'

import { mock } from 'jest-mock-extended'

describe('FacebookAuthenticationService', () => {
  // should call LoadFacebookUserApi with correct params
  it('deve chamar LoadFacebookUserApi com parâmetros corretos', async () => {
    const loadFacebookUserApi = mock<ILoadFacebookUserApi>()
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    await sut.perform({ token: 'any_token' })

    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledWith({ token: 'any_token' })
    expect(loadFacebookUserApi.loadUser).toHaveBeenCalledTimes(1)
  })

  // should return AuthenticationError when LoadFacebookUserApi returns undefined
  it('deve retornar AuthenticationError quando LoadFacebookUserApi retornar undefined', async () => {
    const loadFacebookUserApi = mock<ILoadFacebookUserApi>()
    loadFacebookUserApi.loadUser.mockResolvedValueOnce(undefined)
    const sut = new FacebookAuthenticationService(loadFacebookUserApi)

    const authResult = await sut.perform({ token: 'any_token' })

    expect(authResult).toEqual(new AuthenticationError())
  })
})
