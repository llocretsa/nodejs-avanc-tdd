import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '../errors'

export interface IFacebookAuthentication {
  perform: (params: IFacebookAuthentication.Params) => Promise<IFacebookAuthentication.Result>
}

namespace IFacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}


