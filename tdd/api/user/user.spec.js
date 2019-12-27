const request = require('supertest');
const should = require('should');
const app = require('../../index'); // index는 생략해도 된다.
const models = require('../../models');

describe('GET /users는', () => {
    describe('성공 시', () => {
        const users = [
            {id: 1, name: 'marco'},
            {id: 2, name: 'anna'},
            {id: 3, name: 'kim'},
        ];
        before(() => models.sequelize.sync({force: true}));
        before(() => models.User.bulkCreate(users));
        it('유저정보를 담은 객체를 반환한다', (done) => { //done은 콜백함수임
            request(app)
                .get('/users')
                .end((err, res) => {
                    res.body.should.be.instanceOf(Array);
                    done();
                })
        })
        it('최대 limit개수만큼 응답한다', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                })
        })
    })
    describe('실패 시', () => {
        it('limit이 숫자형이 아니면 400을 응답한다', (done) => {
            request(app)
                .get('/users?limit=two')
                .expect(400)
                .end(done);
        })
        it('최대 limit개수만큼 응답한다', (done) => {
            request(app)
                .get('/users?limit=2')
                .end((err, res) => {
                    res.body.should.have.lengthOf(2);
                    done();
                })
        })
    })
});

describe('GET /users/:id는', () => {
    const users = [
        {id: 1, name: 'marco'},
        {id: 2, name: 'anna'},
        {id: 3, name: 'kim'},
    ];
    before(() => models.sequelize.sync({force: true}));
    before(() => models.User.bulkCreate(users));
    describe('성공 시', () => {
        it ('id가 1인 유저객체를 반환한다', (done) => {
            request(app)
                .get('/users/1')
                .end((err, res) => {
                    res.body.should.have.property('id', 1)
                    done();
                })
        })
    });
    describe('실패 시', () => {
        it ('id가 숫자가 아닐 경우 400을 응답한다', (done) => {
            request(app)
                .get('/users/one')
                .expect(400)
                .end(done);
        })
        it ('id로 유저를 찾을 수 없을 경우 404를 응답한다', (done) => {
            request(app)
                .get('/users/999')
                .expect(404)
                .end(done);
        })
    })
});

describe('POST /users는', () => {
    const users = [
        {id: 1, name: 'marco'},
        {id: 2, name: 'anna'},
        {id: 3, name: 'kim'},
    ];
    before(() => models.sequelize.sync({force: true}));
    before(() => models.User.bulkCreate(users));
    describe('성공 시', () => {
        let name = 'hyunsang'
        let body;
        before(done => { // 중복되는 부분은 이렇게 before에서 처리해주면 된다.
            request(app)
            .post('/users')
            .send({name})
            .expect(201)
            .end((err, res) => {
                body = res.body;
                done();
            })
        })
        it ('생성된 유저객체를 반환한다', () => {
            body.should.have.property('id')
        })
        it ('입력한 name을 반환한다', () => {
            body.should.have.property('name', name)
        })
    });
    describe('실패 시', () => {
        it ('name 파라미터 누락 시 400을 응답한다', (done) => {
            request(app)
                .post('/users')
                .send({})
                .expect(400)
                .end(done);
        })
        it ('중복된 name인 경우 409를 응답한다', (done) => {
            request(app)
            .post('/users')
            .send({name: 'marco'})
            .expect(409)
            .end(done);
        })
    })
});

describe('PUT /users/:id는', () => {
    const users = [
        {id: 1, name: 'marco'},
        {id: 2, name: 'anna'},
        {id: 3, name: 'kim'},
    ];
    before(() => models.sequelize.sync({force: true}));
    before(() => models.User.bulkCreate(users));
    describe('성공시', () => {
        let name = 'christmas';
        let body;
        before(done => {
            request(app)
                .put('/users/1')
                .send({name})
                .expect(203)
                .end((err, res) => {
                    body = res.body;
                    done();
                })
        })
        it('변경된 name을 응답한다', () => {
            body.should.have.property('name', name)
        })
    });
    describe('실패 시', () => {
        it('정수가 아닌 id일 경우 400을 응답한다', done => {
            request(app)
            .put('/users/not-number')
            .send({name: 'christmas'})
            .expect(400)
            .end(done)
        })
        it('name이 없을 경우 400을 응답한다', done => {
            request(app)
            .put('/users/1')
            .send({})
            .expect(400)
            .end(done)
        })
        it('없는 유저일 경우 404를 응답한다', done => {
            request(app)
            .put('/users/0')
            .send({name: 'christmas'})
            .expect(404)
            .end(done)
        })
        it('이름이 중복일 경우 409를 응답한다', done => {
            request(app)
            .put('/users/1')
            .send({name: 'christmas'})
            .expect(409)
            .end(done)
        })
    })
})

describe('DELETE /users 1는', () => {
    const users = [
        {id: 1, name: 'marco'},
        {id: 2, name: 'anna'},
        {id: 3, name: 'kim'},
    ];
    before(() => models.sequelize.sync({force: true}));
    before(() => models.User.bulkCreate(users));
    describe('성공시', () => {
        it('204를 응답한다', (done) => {
            request(app)
                .delete('/users/1')
                .expect(204)
                .end(done);
        })
    })
    describe('실패시', () => {
        it('id가 숫자형이 아닐 경우 400(bad request)로 응답한다', done => {
            request(app)
                .delete('/users/one')
                .expect(400)
                .end(done);
        })
    })
});