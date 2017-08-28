import { Form, Input, Switch, Button } from 'antd';
import React from 'react';
import request from './util/request';
import schedule from 'node-schedule';

const FormItem = Form.Item;

let rule = new schedule.RecurrenceRule();
let times = [];
for(let i=1; i<60; i++){
    times.push(i);
}
rule.minute =times;
schedule.scheduleJob(rule, function(){
    console.log('hehe');
});

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
            request({
                url: values.webHook,
                desc: 'post data to hook.',
                method: 'POST',
                data: {"msgtype": "text", "text":{"content": values.content}, "at":{"isAtAll": values.isAtAll}}
            }).then((data) => {
                console.log(data);
            })
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