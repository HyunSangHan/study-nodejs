const request = require('supertest');
const should = require('should');
const app = require('./index');

describe('GET /users는', () => {
    describe('성공 시', () => {
        it('유저정보를 담은 객체를 반환한다', (done) => { //done은 콜백함수임
            request(app)
                .get('/users')
                .end((err,res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        })    
    })
})