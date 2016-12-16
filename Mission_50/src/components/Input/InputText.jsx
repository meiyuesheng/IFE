import React,{Component} from 'react';
import styles from './InputText.scss';
import {findDOMNode} from 'react-dom';
// 为什么要设置组件：因为整个页面用到input地方太多，为了精简代码，实现复用，
//就把共有的功能抽象出来。
//表格组件的功能
// 接受参数设置样式
// 点击选中全部
// 失去焦点 或者 确定  激发事件，传递数据
// input display要block


export default class InputText extends Component{

	constructor(props){
		super(props);
		
	}

	handleChange(event){
	
	this.props.onEdit(event);
	
	}

	handleBlur(event){
		if (event.type==='blur'||event.which===13) {
		console.log("触发save");
		console.log(event.target);
		this.props.onSaveEdit(event);
		}
	}
	

	componentDidMount(){
		
		const el = findDOMNode(this);
		el.focus();
		el.select();
		
		console.log("触发mount");
	}

	render(){
		const {value,className}=this.props;
		
			
		return (
				<input 
				value={value}
				className={className}
				onBlur={this.handleBlur.bind(this)}
				onKeyDown={this.handleBlur.bind(this)}
				onChange={this.handleChange.bind(this)}
				/>
			);
	}
}

