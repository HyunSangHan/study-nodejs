const app = require('../index');
const syncDb = require('./sync-db'); // export한 함수임.(프로미스를 리턴하는 함수)

syncDb().then(() => { // sync가 되고나면 serve를 한다.
    console.log('Sync Database!')
    app.listen(3000, () => {
        console.log('Server is running on 3000 port!')
    });
})

