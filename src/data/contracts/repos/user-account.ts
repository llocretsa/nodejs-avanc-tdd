export interface ILoadUserAccountRepository {
  load: (params: ILoadUserAccountRepository.Params) => Promise<ILoadUserAccountRepository.Result>
}

export namespace ILoadUserAccountRepository {
  export type Params = {
    email: string
  }

  export type Result = undefined | {
    id: string
    name?: string
  }
}

export interface ISaveFacebookAccountRepository {
  saveWithFacebook: (params: ISaveFacebookAccountRepository.Params) => Promise<ISaveFacebookAccountRepository.Result>
}

export namespace ISaveFacebookAccountRepository {
  export type Params = {
    id?: string
    facebookId: string
    email: string
    name: string
  }

  export type Result = {
    id: string
  }
}
