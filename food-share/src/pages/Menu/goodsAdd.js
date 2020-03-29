import React,{ Component }  from 'react'
import uploadApi from '../../api/upload'
import menuApi from '../../api/menu'
import {Card,Input,Button,Form,Upload,message,Select} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';import menuTypesApi from '../../api/menuTypes'

class GoodsAdd extends Component{
  state = {
    "title":'菜名',
    "tags":"简介",
    "imtro":"来源",
    "kind":"",
    "ingredients":"主材",
    "burden":"辅料",
    "albums":"",
    "types":[],
    loading: false,
  }
  addGoods = async() =>{
    if(!this.state.albums){return message.info('请先上传图片')}
    let {code,msg} = await menuApi.add(this.state)
    if(code){return message.error(msg)}
    message.success('添加成功,正在跳转到菜谱列表')
    this.props.history.replace('/admin/menulist')
    
  }
  
  async componentDidMount(){
    let {list} = await menuTypesApi.typeListAll()
    this.setState({types:list})
    console.log(list);
    
  }
  

  //图片绑定的配置函数
  handleChange = info => {//上传状态效果
    if (info.file.status === 'uploading') {//上传中开启效果
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {//上传完成关闭效果      
      this.setState({loading:false})
    }else if(info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  beforeUpload(file) {//图片限制
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只支持JPG/PNG文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  //表单配置
  selectChange = value => {
    this.setState({kind:value});
  }
  //渲染列表
  render(){
    let {albums,types} = this.state
    //图片配置项
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const props = {
      name: 'albums',
      showUploadList: false,//设置只上传一张图片
      customRequest:async info =>{//自定义上传
        const formData = new FormData()
        formData.append('hehe',info.file)
        let {code,msg,path} = await uploadApi.img(formData)
        if(code){return message.error(msg)}
        this.setState({albums:path})
        message.success('图片上传成功');
        
      },
      headers: {
        authorization: 'authorization-text',
      },
      // onChange(info) {
      //   if (info.file.status !== 'uploading') {
      //     console.log(info.file, info.fileList);
      //   }
      //   if (info.file.status === 'done') {
      //     message.success(`${info.file.name} file uploaded successfully`);
      //   } else if (info.file.status === 'error') {
      //     message.error(`${info.file.name} file upload failed.`);
      //   }
      // },
    };
    //表单配置项
    const layout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 16 },
    }
    const validateMessages = {
      required: '这个是必填项',
    }
    //类别配置项
    const { Option } = Select;
    // const residences = this.typesItem()//类别    
    return(
      <Card title="菜品添加">
        <Form {...layout} name="nest-messages" validateMessages={validateMessages}>
      {/* 菜名 */}
      <Form.Item name={['title', 'name']} label="菜名" rules={[{ required: true }]}>
        <Input onChange={(e)=>{
          this.setState({title:e.target.value})
        }} />
      </Form.Item>
      {/* 简介 */}
      <Form.Item name={['tags']} label="简介" rules={[{ required: true }]}>
        <Input onChange={(e)=>{
          this.setState({tags:e.target.value})
        }} />
      </Form.Item>
      {/* 来源 */}
      <Form.Item name={['imtro']} label="来源" rules={[{ required: true }]}>
        <Input onChange={(e)=>{
          this.setState({imtro:e.target.value})
        }} />
      </Form.Item>
      {/* 分类 */}
      <Form.Item name={['kind']} label="类别" rules={[{ required: true }]}>
      <Select placeholder='请选择类别' 
        style={{ width: 120 }} 
        onChange={this.selectChange}>
          {types.map((item)=>{
            return (
            <Option value={item._id} key={item._id}>{item.menutypesName}</Option>
            )
          })}
      </Select>
      </Form.Item>

      {/* <Form.Item
        name="kind"
        label="类别"
        value={kind}
        rules={[
          { type: 'array', required: true, message: '请选择类别' },
        ]}
        onChange={(e)=>{
          console.log(e.target);
          
          this.setState({kind:e.target.value})
        }} 
      >
        <Cascader options={residences} />
      </Form.Item> */}
      {/* 主材 */}
      <Form.Item name={['ingredients']} label="主材" rules={[{ required: true }]}>
        <Input onChange={(e)=>{
          this.setState({ingredients:e.target.value})
        }}/>
      </Form.Item>
      {/* 辅料 */}
      <Form.Item name={['burden']} label="辅料" rules={[{ required: true }]}>
        <Input onChange={(e)=>{
          this.setState({burden:e.target.value})
        }} />
      </Form.Item>
      {/* 图片 */}
      <Upload {...props}
        listType="picture-card"
        className="avatar-uploader"
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {albums ? <img src={"http://localhost:3000"+albums} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
      {/* 添加 */}
      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
        <Button type="primary" htmlType="submit" onClick={this.addGoods}>
          添加
        </Button>
      </Form.Item>
    </Form>
      </Card>
    )
  }
}
export default GoodsAdd