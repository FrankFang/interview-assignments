import request from 'supertest'
import { app } from "@/app"

describe('Home', function () {
  it('get /', (done) => {
    request(app)
      .get('/')
      .expect('Hello World!')
      .expect(200, done)

  })
})