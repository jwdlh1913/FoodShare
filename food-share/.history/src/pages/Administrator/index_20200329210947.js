import React, { Component } from "react";
import {Card,Table,Button,Modal,notification,Spin,Popconfirm} from 'antd'
import style from './index.module.less'
import Adminsapi from '../../api/adminstrator'
 
class Admins extends Component{
     state={
        dataSource:[],
        visible:false,
        spinning:false,
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
            dataIndex: 'action',
            render:(record)=>{
              return(
                <div>
                   <Popconfirm
                    title="你确定要修改这个管理员吗?"
                    onConfirm={()=>{
                      this.setState({visible:true})
                    }}
                    onCancel={()=>{
                      message.error('取消修改');
                    }}
                  >
                    <Button type='danger' size='small'>修改</Button>
                  </Popconfirm>
                </div>
               )
             }
          }
        ]     
     }
     

     del=async (_id)=>{
      let result =await adminapi.del(_id)
      if(result.code !==0){ return false }
      this.refreshList() 
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