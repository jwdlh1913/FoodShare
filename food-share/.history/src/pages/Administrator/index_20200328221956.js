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
        <Button type="primary" icon={<SearchOutlined />}>
      Search
    </Button>
        <Table dataSource={dataSource} columns={columns} rowKey="_id" />;
        </Card>
    </div>
   )
  }

}


export default Admins;