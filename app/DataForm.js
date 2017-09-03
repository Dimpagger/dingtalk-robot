import { Form, Input, Switch, Button } from 'antd';
import React from 'react';
import request from './util/request';
import locate from './service/locate';
import cron from './util/cron';

const FormItem = Form.Item;

class DataForm extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            url: "https://oapi.dingtalk.com/robot/send?access_token=037b9ce96d55cdf37d49f1a353a6e50c64c70735cb9e5fe9539e38bde9fd4151",
            cron: "0 */10 * * * *",
            data: {
                msgtype: "text",
                text: {
                    content: "我爱我家大宝贝儿",
                },
                at: {
                    isAtAll: false
                }
            }
        }
    }

    componentWillMount(){
        // cron(this.state.cron, this.state.url, this.state.data);
        locate();
    }

    handleSubmit(e){
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

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {labelCol:{xs:{span:24}, sm:{span:6}}, wrapperCol:{xs:{span:24}, sm:{span:14}}};
        return(
            <Form onSubmit={this.handleSubmit}>
                <h1 style={{textAlign:'center', paddingTop: 50, paddingBottom: 20}}>
                    钉钉机器人
                </h1>
                <FormItem {...formItemLayout} label="机器人WebHook地址" hasFeedback>
                    {getFieldDecorator('webHook', {
                        rules: [{required: true, message: '请输入WebHook地址'}],
                        initialValue: "https://oapi.dingtalk.com/robot/send?access_token=0d4487c9daeb09438adc0a219efdae7af93c85e3a8c8772ea30fc08104771c33"
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="消息内容" hasFeedback>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: '请输入消息内容'}],
                        initialValue: "长剑一杯酒 男儿方寸心"
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="定时发送" hasFeedback>
                    {getFieldDecorator('cron', {
                        rules: [{required: true, message: '请输入定时表达式'}],
                        initialValue: "* */10 * * * *"
                    })(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label="@所有人">
                    {getFieldDecorator('isAtAll')(<Switch/>)}
                </FormItem>
                <FormItem wrapperCol={{span:12, offset:6}}>
                    <Button type="primary" htmlType="submit">发送</Button>
                </FormItem>
            </Form>
        )
    }
}


export default Form.create()(DataForm);