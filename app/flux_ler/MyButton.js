import React from 'react';

class MyButton extends React.Component {

    render(){
        return(
            <div>
                <button onClick={props.onClick}>NewItem</button>
            </div>
        )
    }
}