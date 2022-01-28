const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

test('sanity', () => {
  expect(process.env.NODE_ENV).toBe('testing')
})

beforeAll(async () =>{
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () =>{
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

describe('api/auth/register Tests', () => {
  it('should return user from database', (done) => {
    const testUser = {username: "admin", password: "adminPassword"}
    const expected = {id: 2}
    request(server).
    post('/api/auth/register')
    .send(testUser)
    .expect(201)
    .end((err, res) => {
      expect(res.body.id).toEqual(expected.id)
      done();
    })
  })
  it('should deny registration on missing username or password', (done) => {
    const testUser = {username: 'admin', password: ''}
    request(server).
    post('/api/auth/register')
    .send(testUser)
    .expect(401)
    .end((err, res) => {
      expect(res.body.message).toEqual("username and password required")
      done();
    })
  })
})

describe('api/auth/login Tests', () => {
  it('should return a token', (done) => {
    const testUser = {username: "admin2", password: "adminPassword1"}
    request(server).
    post('/api/auth/login')
    .send(testUser)
    .expect(200)
    .end((err, res) => {
      expect(res.body.token)
      done();
    })
  })
  it('should deny login on missing username or password', (done) => {
    const testUser = {username: 'admin', password: ''}
    request(server).
    post('/api/auth/login')
    .send(testUser)
    .expect(401)
    .end((err, res) => {
      expect(res.body.message).toEqual("username and password required")
      done();
    })
  })
})