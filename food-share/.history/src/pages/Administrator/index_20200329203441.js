import React, { Component } from "react";
import {Card,Table,Button,Modal,notification} from 'antd'
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
        dataSource:[],
        visible:false
     }
      // 对话框成功的回调
      handleOk=async ()=>{
       let userName = this.refs.us.value 
       let passWord = this.refs.ps.value 
       let result= await Adminsapi.add(userName,passWord)
        if(result.code!==0){return notification.error({description:'管理员添加失败，请详细检查传输',message:'错误',duration:1.5})}

     }
     // 对话框失败的回调
     handleCancel=()=>{  
      this.setState({visible:false})
     }
    
    async componentDidMount(){
      let rerult= await Adminsapi.List()
      this.setState({dataSource:rerult.adminList})
  }
  
  render(){
      let {dataSource,visible} = this.state
 return(
     <div className={style.admins}>
        <Card  title="管理员列表">
        <Button type="primary" icon={<PlusOutlined/>} onClick={()=>{
          this.setState({visible:true})
        }}>
         添加</Button>
        <Table dataSource={dataSource} columns={columns} rowKey="_id" />;
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