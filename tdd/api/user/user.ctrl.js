const models = require('../../models');

const index = function(req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    models.User
        .findAll({limit: limit})
        .then(users => {
            res.json(users);
        })
};

const show = function(req, res) {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) return res.status(400).end();
    models.User.findOne({
        where: {
            id: id // key와 변수(value)가 같으므로 그냥 id 라고만 써줘도 무방 
        }
    }).then(user => {
        if (!user) return res.status(404).end();
        res.json(user);    
    });
};

const destroy = (req, res) => {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
    models.User.destroy({
        where: {
            id: id
        }
    }).then(() => {
        res.status(204).end();    
    });
};

const create = (req, res) => {
    //원래 express는 body를 지원하지 않으므로 bodyParser를 미들웨어로 추가해줘야 쓸 수 있게 된다.
    const name = req.body.name;
    if (!name) return res.status(400).end();
    models.User.create({ name })
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            if (err.name === 'SequelizeUniqueConstraintError') {
                return res.status(409).end();
            }
            return res.status(500).end()
        })
};

const update = (req, res) => {
    const id = parseInt(req.params.id, 10)
    const name = req.body.name;
    if (!name || Number.isNaN(id)) return res.status(400).end();
    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();
    if (users.filter(user => user.name === name).length > 0) return res.status(409).end();
    user.name = name;
    res.status(203).json(user);
};

module.exports = {
    index: index,
    show: show,
    destroy: destroy,
    create: create,
    update: update
    // ES6에서는 이 부분을 index, show, destroy, create, update 이런 식으로 간단하게 써줘도 된다.
}