import React, {Component} from 'react';
import styles from './Greeter.css';
import { Input } from 'antd';

class Greeter extends Component {
    render(){
        return (
            <div className={styles.root}>
                Hi there adn greetings!
                {/*<Input />*/}
            </div>
        );
    }
}

export default Greeter
//
// module.exports = function(){
//     let greet = document.createElement('div');
//     greet.textContent = "Hi there and greetings!";
//     return greet;
// };