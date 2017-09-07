'use strict';

import fs from 'fs';

const FILE_NAME = 'input.json';

function openFile() {
// 异步打开文件
    console.log("准备打开文件！");
    fs.open(FILE_NAME, 'w', function (err, fd) {
        if (err) {
            return console.error(err);
        }
        console.log("文件打开成功！");
    });
}

function saveData(data){
    fs.writeFile( FILE_NAME, data,  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("数据写入成功！");
        console.log("--------我是分割线-------------")
        console.log("读取写入的数据！");
        fs.readFile(FILE_NAME, function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log("异步读取文件数据: " + data.toString());
        });
    });
}

//
// nconf.file({file: '~/DingTalkConfig.json'});
// // const fs = require('fs');
// // const nconf = require('nconf').file({file: getUserHome() + '/DingTalkConfig.json'});
//
// function saveSettings(settingKey, settingValue){
//     nconf.set(settingKey, settingValue);
//     nconf.save();
//     console.log(settingKey, settingValue)
// }
//
// function readSettings(settingKey) {
//     nconf.load();
//     return nconf.get(settingKey);
// }
//
// function getUserHome(){
//     return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
// }

module.exports = {
    // saveSettings: saveSettings,
    // readSettings: readSettings,
    openFile: openFile,
    saveData: saveData
};
