import {Menu, Icon} from 'antd';
import React from 'react';
import config from './util/configuration';


class DataSider extends React.Component {

    constructor() {
        super();
        this.state = {
            configData: []
        }
    }

    componentWillMount(){
        this.setState({
            configData: config.readDataSync()
        });
    }

    render() {
        console.log("config data: ", this.state);
        const menuList = this.state.configData.map((value, index) => {
            console.log('index: ', index);
            console.log('value: ', value);
            return (
                <Menu.Item key={index}>
                    <Icon type="pie-chart"/>
                    <span>{value.groupName}</span>
                </Menu.Item>
            )
        });
        return (
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                {menuList}
            </Menu>
        )
    }


}

export default DataSider;
