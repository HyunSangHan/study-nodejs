const testFolder = './data';
const fs = require('fs');

fs.readdir(testFolder, function(error, filelist){
    console.log(filelist); // data 디렉토리의 파일목록이 array형태로 담김
})