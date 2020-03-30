import React, { Component } from "react";
import {Card,Table,Button,} from 'antd'
import style from './index.module.less'
import Adminsapi from '../../api/adminstrator'
  
  const columns = [
    {
        title: 'id',
        dataIndex: '_id',
        key: '_id',
      },
    {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName',
    },
  ];
class Admins extends Component{
     state={
        dataSource:[]
     }
 async componentDidMount(){
      let rerult= await Adminsapi.List()
      this.setState({dataSource:rerult.adminList})
  }
  
  render(){
      let {dataSource} = this.state
 return(
     <div className={style.admins}>
        <Card  title="管理员列表">
        <Button type="primary" icon={<PlusOutlined />}>
         添加
        </Button>
        <Table dataSource={dataSource} columns={columns} rowKey="_id" />;
        </Card>
         {/*添加对话框 默认是不显示的*/}
         <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
    </div>
   )
  }

}


export default Admins;