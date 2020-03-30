import React, { Component } from "react";
import {Card,Table} from 'antd'
import style from './index.module.less'

const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '住址',
      dataIndex: 'address',
      key: 'address',
    },
  ];
class Admins extends Component{
    
  render(){
 return(
     <div className={style.admins}>
        <Card  title="管理员列表">



        </Card>
    </div>
   )
  }

}


export default Admins;