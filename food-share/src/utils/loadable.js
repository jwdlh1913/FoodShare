import React from 'react'
import LoadAble from 'react-loadable'

// 过渡组件
function LoadingComponent (){
  return (
    <div>这里是过渡组件</div>
  )
}

export default (LazyComponent)=>{
  return LoadAble({
    loader:LazyComponent,
    loading:LoadingComponent
  })
}