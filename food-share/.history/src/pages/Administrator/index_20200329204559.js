import React, { Component } from "react";
import {Card,Table,Button,Modal,notification,Spin} from 'antd'
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
    { 
      title: '操作',
      dataIndex: 'action',
       render(record){
         return(
          <di
         )
       }
    }
  ];
class Admins extends Component{
     state={
        dataSource:[],
        visible:false,
        spinning:false
     }
      // 对话框成功的回调
      handleOk=async ()=>{
       let userName = this.refs.us.value 
       let passWord = this.refs.ps.value 
       let result= await Adminsapi.add(userName,passWord)
        if(result.code!==0){return notification.error({description:'管理员添加失败，请详细检查输入信息',message:'错误',duration:1.5})}
        notification.success({description:'管理员添加成功，对话框即将关闭',message:'成功',duration:1.5})
        this.setState({visible:false})
        this.refreshList()
     }
     // 对话框失败的回调
     handleCancel=()=>{  
      this.setState({visible:false})
     }

     refreshList=async ()=>{
      this.setState({spinning:true})
      let result = await adminapi.list()
      console.log(result)
      this.setState({dataSource:result.adminList,spinning:false})
     }  

    componentDidMount(){
     this.refreshList()
    }
   render(){
         let {dataSource,visible,spinning} = this.state
   return(
       <div className={style.admins}>
          <Card  title="管理员列表">
          <Button type="primary" icon={<PlusOutlined/>} onClick={()=>{
           this.setState({visible:true})
          }}>
          添加</Button>
          <Spin spinning={spinning}>
         <Table dataSource={dataSource} columns={columns} rowKey="_id" />;
         </Spin>
        </Card>
         {/*添加对话框 默认是不显示的*/}
         <Modal
          title="管理员添加"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         管理员账号:<input  type="text" ref="us"/><br/>
         管理员密码:<input  type="text" ref="ps"/><br/>
        </Modal>
    </div>
   )
  }

}


export default Admins;