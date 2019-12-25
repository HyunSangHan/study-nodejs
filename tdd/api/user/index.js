var users = [
    {id: 1, name: 'marco'},
    {id: 2, name: 'anna'},
    {id: 3, name: 'kim'},
];

app.get('/users', function(req, res) {
    req.query.limit = req.query.limit || 10;
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)) {
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
});

app.get('/users/:id', function(req, res) {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();
    res.json(user);
});

app.delete('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    if (Number.isNaN(id)) return res.status(400).end();
    users = users.filter(user => user.id !== id)[0];
    res.status(204).end();
})

app.post('/users', (req, res) => {
    //원래 express는 body를 지원하지 않으므로 bodyParser를 미들웨어로 추가해줘야 쓸 수 있게 된다.
    const name = req.body.name;
    if (!name) return res.status(400).end();
    if (users.filter(user => user.name === name).length > 0) return res.status(409).end();
    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
})

app.put('/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    const name = req.body.name;
    if (!name || Number.isNaN(id)) return res.status(400).end();
    const user = users.filter(user => user.id === id)[0];
    if (!user) return res.status(404).end();
    if (users.filter(user => user.name === name).length > 0) return res.status(409).end();
    user.name = name;
    res.status(203).json(user);
})