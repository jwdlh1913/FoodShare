import React, { Component } from 'react';
import { Form, Input, Button, Checkbox,message} from 'antd';
import Adminapi from '../../api/adminstrator'
import style from './index.module.less'
import { UserOutlined,LockOutlined } from '@ant-design/icons';

 class Login  extends  Component{
    onFinish=async (values)=>{
        console.log(values);
    let userName = values.username
    let passWord = values.password
    let result = await Adminapi.login(userName,passWord)
    console.log(result);
    if(result.code ===404 ){
        message.error('登录失败');
    }else{
        message.success('登录成功，2s后跳转首页',2,()=>{
    this.props.history.replace("/admin")
    })
    }
    }

    render(){
        return(
            <div className={style['login-box']}>
            <Form
            name="normal_login"
            className={style['login-form']}
            initialValues={{ remember: true }}
            onFinish={this.onFinish}
          >
              {/* 用户名 */}
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: '请输入你的用户名!!!',
                },
                {max:9,message:"用户名最长9位"},
                {min:3,message:"用户名最少3位"}
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />}
               placeholder="用户名" />
            </Form.Item>
            {/* 密码 */}
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: '请输入你的密码!!!',
                },
                {max:9,message:"密码最长9位"},
                {min:3,message:"密码最少3位"}
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>
            {/* 记住密码 */}
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住密码</Checkbox>
              </Form.Item>
            </Form.Item>
            {/* 登录 */}
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
          </div>
        )
    }
 }

 export default Login;