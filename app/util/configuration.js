'use strict';

import fs from 'fs';

const FILE_NAME = 'config.json';

function openFile() {
    fs.open(FILE_NAME, 'a', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！");
    });
}

function saveData(data){
    fs.writeFile( FILE_NAME, data, {flag: 'a'}, function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取文件数据: " + data.toString());
        });
    });
}

function readData(){
    fs.readFile(FILE_NAME, function(err, data){
        if(err){
            return console.error(err);
        }
        console.log(JSON.parse(data));
        return data;
    });
}

module.exports = {
    openFile: openFile,
    saveData: saveData,
    readData: readData
};
