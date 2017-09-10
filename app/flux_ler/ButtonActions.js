import AppDispatcher from './AppDispatcher';

export default ButtonActions = {
    addNewItem: function (text) {
        AppDispatcher.dispatch({
            actionType: 'ADD_NEW_ITEM',
            text: text
        });
    }
};