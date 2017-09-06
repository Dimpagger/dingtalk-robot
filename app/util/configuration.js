'use strict';

import fs from 'fs';
import nconf from 'nconf';

nconf.argv().env().file({file: '~/DingTalkConfig.json'});
// const fs = require('fs');
// const nconf = require('nconf').file({file: getUserHome() + '/DingTalkConfig.json'});

function saveSettings(settingKey, settingValue){
    nconf.set(settingKey, settingValue);
    nconf.save();
    console.log(settingKey, settingValue)
}

function readSettings(settingKey) {
    nconf.load();
    return nconf.get(settingKey);
}

function getUserHome(){
    return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = {
    saveSettings: saveSettings,
    readSettings: readSettings
};
