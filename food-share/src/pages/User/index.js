import React, { Component } from 'react';
import { Card, Table, Button, Modal, notification, Spin, Popconfirm, message } from 'antd'
import style from './User.less'
import userApi from '../../api/user.js'


class Users extends Component {
    state = {
        dataSource: [],
        visibleAdd: false,
        visibleChange: false,
        spinning: false,
        changeId: null,

        //表头信息👇表头信息有几个dataSource就有几个key值还有一个自己的key
        columns: [
            {
                title: 'id',   //显示
                dataIndex: '_id',//数据索引字段
                key: '_id', //key值
            },
            {
                title: '账号',
                dataIndex: 'userName',
                key: 'userName',
            },
            {
                title: '操作',
                key: 'action',

                // 如果要渲染的列有样式的直接在rander里面写---箭头函数return一个标签解构
                // 参数如果没写dataIndex 整条数据  写了dataIndex 那就是关联数据
                //record做函数传参代表获取整行数据
                render: (record) => {
                    return (
                        <div>
                            <Popconfirm
                                title="你确定要删除这个用户吗?"
                                onConfirm={() => {
                                    this.del(record._id)
                                }}
                                onCancel={() => {
                                    message.error('取消删除');
                                }}
                            >
                                <Button type='danger' size='small'>删除</Button>
                            </Popconfirm>
                            <Button type='primary' size='small' onClick={() => {
                                this.setState({ visibleChange: true, changeId: record._id })
                            }}>修改</Button>
                        </div>
                    )
                },
            }
        ]
    }


    del = async (_id) => {
        // 获取id 掉接口 刷新界面
        let result = await userApi.del(_id)
        // 根据结果进行
        if (result.code !== 0) { return false }
        this.refreshList()
    }

    //模态框确认函数
    handleOk = async () => {
        let userName = this.refs.us.value
        let passWord = this.refs.ps.value
        let result = await userApi.insert(userName, passWord)
        if (result.code !== 0) { return notification.error({ description: '用户添加失败，请详细检查传输', message: '错误', duration: 1.5 }) }
        notification.success({ description: '用户已添加，模态框即将关闭', message: '成功', duration: 1.5 })
        this.setState({ visibleAdd: false })
        this.refreshList()
    }

    //修改用户
    changeDone = async () => {
        let userName = this.refs.newUs.value
        let passWord = this.refs.newPs.value
        let id = this.state.changeId
        let result = await userApi.change(id, { userName, passWord })
        if (result.code !== 0) { return notification.error({ description: '用户修改失败，请详细检查输入信息', message: '错误', duration: 1.5 }) }
        notification.success({ description: '用户修改成功，对话框即将关闭', message: '成功', duration: 1.5 })
        this.setState({ visibleChange: false })
        this.refreshList()
    }


    //模态框关闭函数
    handleCancel = () => {
        this.setState({ visibleAdd: false })
    }

    //刷新列表数据
    refreshList = async () => {
        this.setState({ spinning: true })
        let result = await userApi.list()
        console.log(result)
        this.setState({ dataSource: result.userList, spinning: false })
    }
    componentDidMount() {
        // 请求数据渲染界面
        this.refreshList()
    }
    render() {
        let { dataSource, visibleAdd, visibleChange, spinning, columns } = this.state
        return (
            <div className={style.admins}>
                <Card title='用户列表'>
                    <Button type="primary" onClick={() => {
                        this.setState({ visibleAdd: true })
                    }}>添加</Button>
                    <Spin spinning={spinning}>
                        <Table dataSource={dataSource} columns={columns} rowKey='_id'></Table>
                    </Spin>
                </Card>
                {/* 添加的模态框 */}
                <Modal
                    title="用户添加"
                    visible={visibleAdd}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    用户名:<input type="text" ref='us' /><br />
                    密码:<input type="text" ref='ps' /><br />
                </Modal>

                <Modal
                    title="用户修改"
                    visible={visibleChange}
                    onOk={this.changeDone}
                    onCancel={this.handleCancel}
                >
                    新用户名:<input type="text" ref='newUs' /><br />
                    新密码:<input type="text" ref='newPs' /><br />
                </Modal>

            </div>
        );
    }
}

export default Users;