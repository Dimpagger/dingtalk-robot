import { Form, Input, Tooltip, Icon, Select, Row, Col, Checkbox, Button } from 'antd';
import React from 'react';

const FormItem = Form.Item;
const Option = Select.Option;

class DataForm extends React.Component{

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {labelCol:{xs:{span:24}, sm:{span:6}}, wrapperCol:{xs:{span:24}, sm:{span:14}}};
        return(
            <Form >
                <h1 style={{textAlign:'center', paddingTop: 50}}>
                    钉钉机器人
                </h1>
                <FormItem {...formItemLayout} label="钉钉群hook" hasFeedback>
                    {getFieldDecorator('email', {
                        rules: [{type:'email', message: 'The input is not valid E-mail'}, {required: true, message: 'Please input your E-mail'}]
                    })(<Input/>)}
                </FormItem>
            </Form>
        )
    }
}


export default Form.create()(DataForm);