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

function initFile() {
    fs.writeFile(FILE_NAME, {flag: 'r'}, function (err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("初始化配置文件");
        console.log('fd', fd);
    });
}

function saveData(data){
    let content = '';
    let obj = [];
    fs.readFile(FILE_NAME, function(err, data){
        if(err){
            return console.error(err);
        }
        content = data;
        console.log('read file: ', content);
    });

    try{
        obj = JSON.parse(content);
    } catch(e){
        console.error('原始文件数据异常 content: ', content);
    }

    obj.push(JSON.parse(data));

    fs.writeFile( FILE_NAME, JSON.stringify(obj), {flag: 'w'}, function(err) {
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
    initFile: initFile,
    readData: readData
};
