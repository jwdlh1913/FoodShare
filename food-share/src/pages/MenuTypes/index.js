import React, {Component} from 'react'
import apimenuTypes from '../../api/menuTypes'
import { Card, Table, Popconfirm, message, Button, Spin, Modal, Pagination, Input, notification } from 'antd';
import Style from './index.module.less'
class MenuTypes extends Component{
  state = {
    val:'',
    id: null,
    list: [],
    page: 1,
    pageSize: 5,
    count: 0,
    spinning: false,
    visible_a: false,
    visible_u: false,
    columns: [
      {
        title: 'id',
        dataIndex: '_id',
        key: '_id',
        width: 300
      },
      {
        title: '类别',
        dataIndex: 'menutypesName',
        key: 'menutypesName',
        width: 150
      },
      {
        title: '操作',
        key: 'action',
        render: record => {
          return(
            <span>
              <Popconfirm
                title="你确定要删除这种类别嘛？"
                onConfirm={()=>{ this.delMenuTypes(record._id) }}
                onCancel={()=>{ message.error('取消删除') }}
                okText="确认"
                cancelText="取消"
              >
                <Button type='danger' size='small' style={{marginRight:'10px'}}>删除</Button>
              </Popconfirm>
             <Button type='primary' size='small' onClick={()=>{
               this.setState({visible_u:true,val:record.menutypesName,id:record._id})
             }}>修改</Button>
            </span>
          )
        },
      },
    ]
  }
  // 修改类别
  updateMenuTypes = async () =>{
    let id = this.state.id
    let menutypesName = this.state.val
    let {code,msg} = await apimenuTypes.typesUpdate(id,menutypesName)
    if(code !== 0){ return notification.error({
      message: '错误',
      description: msg,
      duration: 1.5
    })}
    notification.success({
      message: '成功',
      description: '类别修改成功',
      duration: 1.5
    })
    this.setState({visible_u:false})
    this.state.val = ''
    this.getListData()
  }
  // 添加类别
  handleOk = async () => {
    let menutypesName = this.state.val
    let {code, msg} = await apimenuTypes.typesAdd({menutypesName})
    if(code !== 0){ return notification.error({
      message: '错误',
      description: msg,
      duration: 1.5
    })}
    notification.success({
      message: '成功',
      description: '类别添加成功',
      duration: 1.5
    })
    this.setState({visible_a:false})
    this.state.val = ''
    this.getListData()
  }
  // 删除类别
  delMenuTypes = async (id) => {
    let {code, msg} = await apimenuTypes.typesDel(id)
    if(code) { return message.error(msg) }
    message.success(msg)
    this.getListData()
  }
  // 获取列表数据
  getListData = async () => {
    let { page, pageSize } = this.state
    this.setState({spinning: true}) // 加载动画
    let {list,count,code,msg} = await apimenuTypes.typesList(page,pageSize)
    if( code !== 0 ){ return message.error(msg) }
    this.setState({list, count, spinning:false})
  }
  componentDidMount(){
    // 请求数据渲染页面
    this.getListData()
  }
  render(){
    let {columns, list, spinning, visible_a, visible_u, count, page, pageSize, val} = this.state
    return(
      <div className={Style.menuTypesBox}>
        <Card title="菜谱类别列表" bordered={false}>
          <Button type='primary' style={{'marginBottom':15}} onClick={()=>{
            this.setState({visible_a: true})
          }}>添加类别</Button>
          <Spin spinning={spinning}>
            <Table columns={columns} dataSource={list}
            rowKey='_id' pagination={false} className={Style.table}
            />
          </Spin>
          {/* 分页器 */}
          <Pagination style={{'marginTop':'10px'}}
            current={page} total={count} pageSize={pageSize}
            onChange={(page,pageSize)=>{
              //只要页码数发生改变就会触发          
              this.setState({page,pageSize},()=>{
                this.getListData()
              })   
            }}
          ></Pagination>
        </Card>
        {/* 添加模态框 */}
        <Modal title='添加类别' visible={visible_a} onOk={this.handleOk} onCancel={()=>{ this.setState({visible_a:false,val:''}) }}
        okText="确认"
        cancelText="取消"
        >
          类别：<Input value={val} onChange={(e)=>{
            this.setState({val:e.target.value})
          }} style={{borderRadius:'10px',width:300}}/>
        </Modal>
        {/* 修改模态框 */}
        <Modal title='修改类别' visible={visible_u} onOk={this.updateMenuTypes} onCancel={()=>{ this.setState({visible_u:false,val:''}) }}
        okText="确认"
        cancelText="取消"
        >
          类别：<Input value={val} onChange={(e)=>{
            this.setState({val:e.target.value})
          }} style={{borderRadius:'10px',width:300}}/>
        </Modal>
      </div>
    )
  }
}
export default MenuTypes
