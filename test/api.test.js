const { describe, before, after, it } = require("node:test");
const { deepStrictEqual, strictEqual, ok } = require("node:assert");

const BASE_URL = `http://localhost:15761`;

describe('API Workflow', () => {
  let _server = {};

  before(async () => {
    _server = require("../../bin/server.js");
    await new Promise(resolve => _server.once("listening", resolve));
  });

  after(done => _server.close(done));

  it('should receive not authorized given wrong user and password', async () => {
    const data = {
      user: 'pedrolucas',
      password: '123'
    }
    const request = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    deepStrictEqual(request.status, 400)
    const response = await request.json()
    deepStrictEqual(response, { error: 'user invalid!' })
  })

  it('should login successfuly given user and password', async () => {
    const data = {
      user: 'pedrolucas',
      password: '123'
    }
    const request = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
    })

    deepStrictEqual(request.status, 200)
    const response = await request.json()
    ok(response.token, "token should be present")
    _globalToken = response.token
  })

  it('should not be allowed to access private data without a token', async () => {
    const headers = {
      authorization: ''
    }
    const request = await fetch(`${BASE_URL}`, {
      headers
    })
    deepStrictEqual(request.status, 400)
    const response = await request.json()
    deepStrictEqual(response, { result: 'invalid token!' })
  })

  it('should be allowed to access private data given a valid token', async () => {
    const headers = {
      authorization: _globalToken
    }
    const request = await fetch(`${BASE_URL}`, {
      headers
    })
    deepStrictEqual(request.status, 200)
    const response = await request.json()
    deepStrictEqual(response, { result: 'Hey welcome!' })
  })
})