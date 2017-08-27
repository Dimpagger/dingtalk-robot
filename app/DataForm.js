import { Form, Input, Switch, Button } from 'antd';
import React from 'react';
import request from "request";

const FormItem = Form.Item;

class DataForm extends React.Component{
    constructor(){
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if(err){
                return
            }
            console.log(values);
            this.fetch(values.webHook).then((resp) => {
                console.log(resp);
            }).catch((error) => {
                console.log(error);
            })
        });
    }

    fetch(url){
        return new Promise((resolve, reject) =>{
            request(url, (error, response, body) => {
                if(!error && response.statusCode === 200){
                    resolve(body);
                } else {
                    reject({
                        reason: "Fetch failed."
                    })
                }
            })
        })
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
                        initialValue: "https://oapi.dingtalk.com/robot/send?access_token=xxxxxxxx"
                    })(<Input/>)}
                </FormItem>
                <FormItem {...formItemLayout} label="消息内容" hasFeedback>
                    {getFieldDecorator('content', {
                        rules: [{required: true, message: '请输入消息内容'}],
                        initialValue: "长剑一杯酒 男儿方寸心"
                    })(<Input/>)}
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