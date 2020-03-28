import React,{ Component }  from 'react'
import MenuApi from '../../api/menu'
import {message ,Table ,Pagination} from 'antd'
import style from './goodsList.module.less'

class GoodsList extends Component{
  state = {
    page:1,
    pageSize:2,
    list:[],
    count:0,
    columns:[
      {title:'id',dataIndex:'_id',key:'_id',fixed:"left",width:80},
      {title:'菜名',dataIndex:'title',key:'title',width:80},
      {title:'简介',dataIndex:'tags',key:'tags',width:80},
      {title:'来源',dataIndex:'imtro',key:'imtro',width:80,height:80},
      {title:'类别',dataIndex:'kind',key:'kind',width:80},
      {title:'主材',dataIndex:'ingredients',key:'ingredients',width:80},
      {title:'辅料',dataIndex:'burden',key:'burden',width:80},
      {title:'主图',dataIndex:'albums',key:'albums',width:80},
      {title:'用户',dataIndex:'userId',key:'userId',width:80},
      {title:'操作',key:'action',width:80,fixed:'right'}
    ]
  }
  componentDidMount(){//组件挂载完获取数据
    this.getListData()//获取数据函数
  }
  getListData = async() =>{
    let {page,pageSize} = this.state
    let {code,msg,list,count} = (await MenuApi.list(page,pageSize)).data    
    console.log(code,msg,list,count);
    if(code !== 0){return message.error(msg)}
    this.setState({list,count})    
  }
  render(){
    let {list,columns,count,page,pageSize} = this.state//解构this.state数据
    return(
      <div>
        {/* 表格 */}
        <Table
          columns={columns}
          dataSource={list}
          pagination={false}
          rowKey="_id"
          className={style.td}
        />
        {/* 分页 */}
        <Pagination current={page} total={count} showQuickJumper pageSize={pageSize} onChange={(page,pageSize)=>{
          this.setState({page},()=>{
            this.getListData()
          })
        }} />
      </div>
    )
  }
}
export default GoodsList