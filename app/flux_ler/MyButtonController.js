import React from 'react';
import ButtonActions from 'ButtonActions';
import MyButton from './MyButton';
import ListStore from './ListStore';

class MyButtonController extends React.Component {
    constructor(){
        super();
        this.createNewItem = this.createNewItem.bind(this);
    }

    createNewItem(e){
        ButtonActions.addNewItem('new Item');
    }

    render(){
        return(
            <MyButton onClick = {this.createNewItem} />
        );
    }
}

export default MyButtonController;