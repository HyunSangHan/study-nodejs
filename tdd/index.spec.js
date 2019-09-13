const app = require('./index');
const request = require('supertest');

describe('GET /users는', () => {
    it('블라블라', (done) => { //done은 콜백함수임
        request(app)
            .get('/users')
            .end((err,res) => {
                console.log(res.body);
                done();
            })
    })
})