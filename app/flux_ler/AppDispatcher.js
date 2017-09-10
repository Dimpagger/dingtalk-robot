// import {Dispatcher} from 'flux';
var Dispatcher  = require('flux').Dispatcher;
var ListStore = require('./ListStore');

AppDispatcher.register(function(action){
    switch(action.actionType){
        case 'ADD_NEW_ITEM':
            ListStore.addNewItemHandler(action.text);
            ListStore.emitChange();
            break;
        default:
            // no op
    }
});

module.exports = new Dispatcher();