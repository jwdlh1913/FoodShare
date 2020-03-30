import React, { Component } from "react";
import {Card,Table,Button,Modal,notification,Spin,Popconfirm,message} from 'antd'
import style from './index.module.less'
import Adminsapi from '../../api/adminstrator'
 
class Admins extends Component{
     state={
        dataSource:[],
        visible:false,
        spinning:false,
        status:0,
        _id:null,
        columns:[
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
            title: '删除',
            dataIndex: 'action',
            render:(record)=>{
              return(
                <div>
                   <Popconfirm
                    title="你确定要删除这个管理员吗?"
                    onConfirm={()=>{
                      this.del(record._id)
                    }}
                    onCancel={()=>{
                      message.error('取消删除');
                    }}
                  >
                    <Button type='danger' size='small'>删除</Button>
                  </Popconfirm>
                </div>
               )
             }
          },
          { 
            title: '修改',
            dataIndex: 'amend',
            render:(record)=>{
              return(
                <div>
                    <Button type='danger' size='small' onClick={()=>{
                      this.setState({visible:true,status=2,_id=record._id})
                    }}>修改</Button>
                </div>
               )
             }
          }
        ]     
     }
     

     del=async (_id)=>{
      let result =await Adminsapi.del(_id)
      if(result.code !==0){ return false }
      this.refreshList() 
    }
      // 对话框成功的回调
      handleOk=async (status,_id)=>{
       if(status===1){
        let userName = this.refs.us.value 
        let passWord = this.refs.ps.value 
        let result= await Adminsapi.add(userName,passWord)
         if(result.code!==0){return notification.error({description:'管理员添加失败，请详细检查输入信息',message:'错误',duration:1.5})}
         notification.success({description:'管理员添加成功，对话框即将关闭',message:'成功',duration:1.5})
        this.setState({visible:false})
        this.refreshList()
       }
       if(status===2,_id){
        let userName = this.refs.us.value 
        let passWord = this.refs.ps.value 
        let result= await Adminsapi.put(_id,userName,passWord)
         if(result.code!==0){return notification.error({description:'管理员修改失败，请详细检查输入信息',message:'错误',duration:1.5})}
         notification.success({description:'管理员修改成功，对话框即将关闭',message:'成功',duration:1.5})
        this.setState({visible:false})
        this.refreshList()
       }
     }
     // 对话框失败的回调
     handleCancel=()=>{  
      this.setState({visible:false})
     }

     refreshList=async ()=>{
      this.setState({spinning:true})
      let result = await Adminsapi.list()
      console.log(result)
      this.setState({dataSource:result.administratorList,spinning:false})
     }  

    componentDidMount(){
     this.refreshList()
    }
   render(){
         let {dataSource,visible,spinning,columns,status} = this.state
   return(
       <div className={style.admins}>
          <Card  title="管理员列表">
          <Button type="primary" icon={<PlusOutlined/>} onClick={()=>{
           this.setState({visible:true,status=1})
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
          status={status}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
         管理员账号:<input  type="text" ref="us"/><br/>
         管理员密码:<input  type="text" ref="ps"/><br/>
        </Modal>
        <Modal
          title="管理员修改"
          visible={visible}
          status={status}
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