const models = require("../models");

module.exports = () => {
    return models.sequelize.sync({force: true})
    // force: true 는, 기존 데이터를 모두 날리고 새로 싱크를 맞추겠다는 의미고
    // 참고로, 이렇듯 모델.시퀄라이즈.싱크는 내부적으로 프로미스를 리턴하기 때문에 비동기를 완료할 수 있도록 인터페이스를 지원한다.
}