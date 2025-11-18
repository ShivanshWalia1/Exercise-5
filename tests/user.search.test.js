// tests/user.search.test.js
import request from 'supertest'
import createApp from './appForTests.js'

// create app once per test file
const app = createApp()

describe('POST /user/search', () => {

  test('200 and returns matching users when forename exists (e.g. Roy)', async () => {
    const res = await request(app)
      .post('/user/search')
      .set('Content-Type', 'application/json')
      .send({ forename: 'Roy' })

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    // at least one returned item must have forename Roy
    expect(res.body).toEqual(
      expect.arrayContaining([ expect.objectContaining({ forename: 'Roy' }) ])
    )
  })

  test('404 and error body when forename not found', async () => {
    const res = await request(app)
      .post('/user/search')
      .set('Content-Type', 'application/json')
      .send({ forename: 'NameThatDoesNotExist123' })

    expect(res.status).toBe(404)
    expect(res.body).toEqual({ error: 'User not found' })
  })

  test('415 when Content-Type is not application/json', async () => {
    const res = await request(app)
      .post('/user/search')
      .set('Content-Type', 'text/plain')
      .send('forename=Roy')

    expect(res.status).toBe(415)
  })

  test('400 when forename is missing from body', async () => {
    const res = await request(app)
      .post('/user/search')
      .set('Content-Type', 'application/json')
      .send({}) // no forename

    expect(res.status).toBe(400)
    expect(res.body).toEqual({ error: 'forename is required' })
  })

})
