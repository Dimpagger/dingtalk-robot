import React from 'react';
import {Layout, Menu, Icon} from 'antd';
import DataForm from './DataForm';
import DataSider from './DataSider';
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
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.siderFold}
                    onCollapse={this.switchSider}
                >
                    <div className="logo" />
                    <DataSider/>
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
