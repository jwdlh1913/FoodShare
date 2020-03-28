import React, {Component, Fragment} from 'react'
import { Layout, Menu } from 'antd';
import { HomeOutlined, SettingFilled, SolutionOutlined, UserOutlined, RadarChartOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import Style from './index.module.less'
import navList from './navList'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class Admin extends Component {
  state = {
    collapsed: false,
  }
  onCollapse = collapsed => {
    this.setState({ collapsed });
  }
  handleClick =(e)=>{
    let {path} = e.item.props 
    this.props.history.replace(path)
  }
  renderIcon(icon){
    switch (icon) {
      case 'home':
        return <HomeOutlined/>
      case 'setting':
        return <SettingFilled/>
      case 'solution':
        return <SolutionOutlined/>
      case 'user':
        return <UserOutlined/>
      default:
        return <RadarChartOutlined />
    }
  }
  renderItem(data){
    return data.map((item,index)=>{
      if(item.children){
        return (
          <SubMenu key={item.key}
            title={ (()=>{
              return (
                <span> 
                 {this.renderIcon(item.icon)}
                 <span>{item.title}</span>
                </span> 
              )
            })()}
          >
            {this.renderItem(item.children)}
          </SubMenu>
        )
      }else{
        return (
          <Menu.Item key={item.key} path={item.path}>
            <Fragment>
              {this.renderIcon(item.icon)}
              <span>{item.title}</span>
            </Fragment>
          </Menu.Item>
        )
      }
    })
  }
  render(){
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className={Style.logo} />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" onClick={this.handleClick}>
            { this.renderItem(navList) }
          </Menu>
        </Sider>
        <Layout className={Style["site-layout"]}>
          <Header className={Style["site-layout-background"]} style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            {this.props.children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}
export default withRouter(Admin) 