class FacebookLoginController {
  async handle(httpRequest: any): Promise<HttpResponse> {
    return {
      statusCode: 400,
      data: new Error('The fiel token is required')
    }
  }
}

type HttpResponse = {
  statusCode: number
  data: any
}

describe('FacebookLoginController', () => {
  // should return 400 if token is empty
  it('deve retornar 400 se o token estiver vazio/em branco', async () => {
    const sut = new FacebookLoginController()

    const httpResponse = await sut.handle({ token: '' })

    expect(httpResponse).toEqual({
      statusCode: 400,
      data: new Error('The fiel token is required')
    })
  })
})
