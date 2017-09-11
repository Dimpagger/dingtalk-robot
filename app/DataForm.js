import {Form, Input, Switch, Button, Row, Col} from 'antd';
import React from 'react';
import request from './util/request';
import cron from './util/cron';
import config from './util/configuration';

const FormItem = Form.Item;

class DataForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.state = {
            groupName: "",
            url: "",
            cron: "",
            data: {
                msgtype: "text",
                text: {
                    content: "",
                },
                at: {
                    isAtAll: false
                }
            }
        }
    }

    componentWillMount() {
        console.log(config.readDataSync());
        const data = config.readDataSync();
        this.setState({
            groupName: data[0].groupName,
            url: data[0].webHook,
            cron: data[0].cron,
            data: {
                msgtype: "text",
                text: {
                    content: data[0].content,
                },
                at: {
                    isAtAll: data[0].isAtAll
                }
            }
        })
    }

    handleSave() {
        this.props.form.validateFields((err, values) => {
            config.saveDataSync(JSON.stringify(values));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) {
                return
            }
            console.log(values);
            this.setState({
                url: values.webHook,
                data: {"msgtype": "text", "text": {"content": values.content}, "at": {"isAtAll": values.isAtAll}}
            }, () => {

                request({
                    url: this.state.url,
                    desc: 'post data to hook.',
                    method: 'POST',
                    data: this.state.data
                }).then((data) => {
                    console.log(data);
                })
            });
            cron(this.state.cron, this.state.url, this.state.data);
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {labelCol: {xs: {span: 24}, sm: {span: 6}}, wrapperCol: {xs: {span: 24}, sm: {span: 14}}};
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label="群聊名称" hasFeedback>
                    {getFieldDecorator('groupName', {
                        rules: [{required: true, message: '请输入群聊名称'}],
                        initialValue: this.state.groupName
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="机器人WebHook地址" hasFeedback>
                    {getFieldDecorator('webHook', {
                        rules: [{required: true, message: '请输入WebHook地址'}],
                        initialValue: this.state.url
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="消息内容" hasFeedback>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: '请输入消息内容'}],
                        initialValue: this.state.data.text.content
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="定时发送" hasFeedback>
                    {getFieldDecorator('cron', {
                        rules: [{required: true, message: '请输入定时表达式'}],
                        initialValue: this.state.cron
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="@所有人">
                    {getFieldDecorator('isAtAll')(<Switch/>)}
                </FormItem>
                <Row>
                    <Col span={3} offset={15}>
                        <FormItem wrapperCol={{span: 12, offset: 6}}>
                            <Button type="primary" htmlType="submit">测试发送</Button>
                        </FormItem>
                    </Col>
                    <Col span={3}>
                        <FormItem wrapperCol={{span: 12, offset: 6}}>
                            <Button type="primary" onClick={this.handleSave}>保存配置</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        )
    }
}

export default Form.create()(DataForm);