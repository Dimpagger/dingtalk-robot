import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import style from './app.less';

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
            <Layout>
                <Sider style={{overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                    <div className="logo"/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
                        <Menu.Item key="1">
                            <Icon type="user"/>
                            <span className="nav-text">nav 1</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="video-camera"/>
                            <span className="nav-text">nav 2</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout style={{marginLeft: 200}}>
                    <Header style={{background: '#fff', padding: 0}}>
                        <div onClick={this.switchSider} className="button">
                        <Icon type={this.state.siderFold ? 'menu-unfold' : 'menu-fold'} />
                        </div>
                    </Header>
                    <Content style={{margin: '24px 16px 0', overflow: 'initial'}}>
                        <div style={{padding: 24, background: '#fff', textAlign: 'center'}}>
                            ...
                            <br/>
                            Really
                            <br/>...<br/>...<br/>...<br/>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>

        )
    }
}

export default App
