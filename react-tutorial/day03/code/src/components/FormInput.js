import React, { Component } from 'react'
import "../assets/styles/formInput.less"
import "../assets/fonts/iconfont.css"

export default class FormInput extends Component {
    render() {
        return (
            <div className="input-group">
                {/* 字体图标 */}
                <i className={"iconfont icon-"+this.props.iconClass}></i>
                {/* 输入框 */}
                <input type={this.props.type} placeholder={this.props.placeholder}/>
            </div>


        )
    }
}
