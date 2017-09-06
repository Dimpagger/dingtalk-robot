import React from 'react';
import {Layout, Menu, Icon, Breadcrumb} from 'antd';
import style from './app.less';
import DataForm from './DataForm';

const {Header, Content, Footer, Sider} = Layout;

class App extends React.Component {

    constructor(){
        super();
        this.switchSider = this.switchSider.bind(this);
        this.state = {
            siderFold: false
        }
    }

    switchSider(){
       this.setState({
           siderFold: !this.state.siderFold
       })
    }

    render(){
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.siderFold}
                    onCollapse={this.switchSider}
                >
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>Config 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span>Config 2</span>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Icon type="file" />
                            <span>Config 3</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', paddingTop: 10, textAlign: 'center'}} >
                        <h1>钉钉机器人</h1>
                    </Header>
                    <Content>
                        <div style={{ padding: 24, background: '#fff', minHeight: 60, paddingTop: 80 }}>
                            <DataForm/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        长剑一杯酒 男儿方寸心 ©2016 Created by Imp
                    </Footer>
                </Layout>
            </Layout>
        )
    }
}

export default App
