import React, {Component, Fragment} from 'react'
import apiMenu from '../../api/menu'
import { message, Button } from 'antd'
import Style from './detail.module.less'

class MenuDetail extends Component{
  state = {
    data: []
  }
  async componentDidMount(){
    let id = this.props.match.params.id
    let {result,code,msg} = await apiMenu.getOne(id)
    if(code){ return message.error(msg)}
    this.setState({data:result})
  }
  render(){
    let {data} = this.state
    return (
      <div>
        {data.map((item,index)=>{
          return(
            <div className={Style.detailBox}>  
              <Button className={Style.back} onClick={()=>{
                this.props.history.go(-1)
              }}>返回</Button>
              <h1>{item.title}</h1>
              <div className={Style.middleBox}>
                <div className={Style.left}>
                  <img src={item.albums} alt=""/>
                </div>
                <div className={Style.right}>
                  <div className={Style.top}>
                    <span>类别：</span>
                    {item.kind.menutypesName}
                  </div>
                  <div className={Style.middle}>
                    <span>标签：</span>
                    {item.tags}
                  </div>
                  <div className={Style.bottom}>
                    <div className={Style.ingredients} style={{marginBottom:"10px"}}>
                      <span>主料：</span>
                      {item.ingredients}
                    </div>
                    <div className={Style.burden}>
                      <span>辅料：</span>
                      {item.burden}
                    </div>
                  </div>
                </div>
              </div>
              <div className={Style.content}>
                <div className={Style.imtro}>
                  <h4>简介：</h4>
                  <p>{item.imtro}</p>
                </div>
                <div className={Style.stepsBox}>
                  <h4>步骤：</h4>
                  {item.steps.map((item,index)=>{
                      return (
                        <div className={Style.steps}>
                          <p>{item.step}</p>
                          <img src={item.img} alt=""/>
                        </div>
                      )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
export default MenuDetail