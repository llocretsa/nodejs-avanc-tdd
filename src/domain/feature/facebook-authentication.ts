import { AccessToken } from '@/domain/models'
import { AuthenticationError } from '../errors'

export interface IFacebookAuthentication {
  perform: (params: IFacebookAuthentication.Params) => Promise<IFacebookAuthentication.Result>
}

export namespace IFacebookAuthentication {
  export type Params = {
    token: string
  }

  export type Result = AccessToken | AuthenticationError
}


