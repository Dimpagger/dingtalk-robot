'use strict';

import fs from 'fs';

const FILE_NAME = 'config.json';


function saveDataSync(data){

    console.log('保存数据：', data);

    let content;
    let obj = [];

    content = fs.readFileSync(FILE_NAME);
    console.log('读取数据: ', content);
    try{
        obj = JSON.parse(content);
    } catch (e){
        console.error('原始文件数据异常 content: ', content);
    }

    const saveObj = JSON.parse(data);
    let alreadyHas = false;

    obj.map((value, index) => {
        if(value.groupName === saveObj.groupName){
            console.log('更新配置: ', saveObj);
            alreadyHas = true;
            obj[index] = saveObj;
        }
    });

    if (!alreadyHas){
        obj.push(saveObj);
        console.log("新增配置: ", saveObj);
    }

    fs.writeFileSync(FILE_NAME, JSON.stringify(obj), {flag: 'w'});

    console.log('保存完成，数据：', fs.readFileSync(FILE_NAME));
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
            console.log("读取文件数据: " + data.toString());
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

function readDataSync(){
    let fileData = fs.readFileSync(FILE_NAME);
    return JSON.parse(fileData);
}

module.exports = {
    saveData: saveData,
    saveDataSync: saveDataSync,
    readData: readData,
    readDataSync: readDataSync
};
