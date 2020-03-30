import React, { Component } from "react";
import {Card,Table} from 'antd'
import style from './index.module.less'
  
  const columns = [
    {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName',
    },
y: 'address',
    },
  ];
class Admins extends Component{
    
  render(){
 return(
     <div className={style.admins}>
        <Card  title="管理员列表">
        <Table dataSource={dataSource} columns={columns} />;
        </Card>
    </div>
   )
  }

}


export default Admins;