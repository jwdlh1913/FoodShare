import React, {Component} from 'react'
import {Card, Form, Input, Button, message} from 'antd'
import {withRouter} from 'react-router-dom'
import Style from './index.module.less'
import apiAdminstrator from '../../api/adminstrator'

const layout = {
  wrapperCol: { span: 5 },
};
class Setting extends Component{
  onFinish = async values => {
    let id = localStorage.getItem('id')
    let {oldPassword,newPassword,newPassword2} = values
    if(newPassword !== newPassword2){ return message.error('两次输入密码不一样，请检查')}
    let {code,msg} = await apiAdminstrator.updatePassword(id,oldPassword,newPassword)
    if(code) { return message.error(msg) }
    message.success(msg)
    this.props.history.replace('/admin/home')
  }

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  }

  render() {
    return (
      <div className={Style.settingBox}>
        <Card title="修改密码" bordered={false}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Form.Item
              label="原密码"
              name="oldPassword"
              rules={[{ required: true, message: '请输入原密码！' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="新密码"
              name="newPassword"
              rules={[{ required: true, min:3,max:9,message: '请输入新密码,长度为3-9位！' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="新密码"
              name="newPassword2"
              rules={[{ required: true, min:3,max:9,message: '请再次输入新密码，长度为3-9位' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}
export default withRouter(Setting)