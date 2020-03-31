import React, { Component } from "react";
import {Card,Table,Button,Modal,notification,Spin,Popconfirm,message,Pagination,Input} from 'antd'
import style from './index.module.less'
import Adminsapi from '../../api/adminstrator'
 
class Admins extends Component{
     state={
      administratorList:[],
        visible_a:false,
        visible_b:false,
        spinning:false,
        page: 1,
        pageSize: 5,
        count: 0,
        id:null,
        userVal:'',
        passVal:'',
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
            title: '操作',
            key: 'action',
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
                  <Button type='primary' size='small' onClick={()=>{
                  this.setState({visible_b:true,userVal:record.userName,passVal:record.passWord,id:record._id})
                  }}>修改</Button>
                </div>
               )
             }
          }
        ]     
     }
     
    put=async()=>{
      let id = this.state.id
      let userName=this.state.userVal
      let passWord=this.state.passVal
      let result=await Adminsapi.put(id,{userName,passWord})
      if(result.code!==0){return notification.error({description:'管理员修改失败，请详细检查输入信息',message:'错误',duration:1.5})}
      notification.success({description:'管理员修改成功，对话框即将关闭',message:'成功',duration:1.5})
      this.setState({visible_b:false})
      this.refreshList()
    }

     del=async (_id)=>{
      let result =await Adminsapi.del(_id)
      if(result.code !==0){ return false }
      this.refreshList() 
    }
     /*  对话框成功的回调 */
      handleOk=async ()=>{
        let userName = this.refs.us.value 
        let passWord = this.refs.ps.value 
        let result= await Adminsapi.add(userName,passWord)
         if(result.code!==0){return notification.error({description:'管理员添加失败，请详细检查输入信息',message:'错误',duration:1.5})}
         notification.success({description:'管理员添加成功，对话框即将关闭',message:'成功',duration:1.5})
        this.setState({visible_a:false})
        this.refreshList()
     }
    /*    对话框失败的回调 */
     handleCancel=()=>{  
      this.setState({visible_a:false})
     }

     refreshList=async ()=>{
      let { page, pageSize } = this.state
      this.setState({spinning:true})
      let  {administratorList,count,code,msg} = await Adminsapi.list(page, pageSize)
      if(code!==0){return message.error(msg)}
      this.setState({administratorList,count,spinning:false})
     }  

    componentDidMount(){
     this.refreshList()
    }
   render(){
         let {administratorList,visible_a,visible_b,spinning,columns,count, page, pageSize,userVal,passVal} = this.state
      return(
        <div className={style.admins}>
          <Card  title="管理员列表">
          <Button type="primary"  onClick={()=>{
           this.setState({visible_a:true})
          }}>
          添加</Button>
          <Spin spinning={spinning}>
         <Table dataSource={administratorList} pagination={false} columns={columns} rowKey="_id" />
          <Pagination style={{'marginTop':'10px'}}
            current={page} total={count} pageSize={pageSize}
            onChange={(page,pageSize)=>{         
              this.setState({page,pageSize},()=>{
                this.refreshList()
              })   
            }}
           ></Pagination>
            </Spin>
        </Card>
         {/*添加对话框 默认是不显示的*/}
         <Modal
          title="管理员添加"
          visible={visible_a}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确认"
          cancelText="取消"
        >
         管理员账号:<input  type="text" ref="us"/><br/>
         管理员密码:<input  type="text" ref="ps"/><br/>
        </Modal>
         {/* 修改对话框 */}
         <Modal title='修改管理员' visible={visible_b}
          onOk={this.put} 
          onCancel={()=>{ this.setState({visible_b:false,userVal:'',passVal:''}) }}
          okText="确认"
          cancelText="取消"
       >
          管理员账号:<Input value={userVal} onChange={(e)=>{
            this.setState({userVal:e.target.value})
          }} /> 
          管理员密码:<Input value={passVal} onChange={(e)=>{
            this.setState({passVal:e.target.value})
          }} />
        </Modal>
    </div>
    )
  }
}


export default Admins;