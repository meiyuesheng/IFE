
import React,{Component} from 'react';
import styles from './Dialog.scss';
import {Mask} from '../';
import {FaTimesCircle} from 'react-icons/lib/fa';
export default class Dialog extends Component{
	constructor(props){
		super(props);
	}
	
	handleChange(){
		const {handleCancel} = this.props;
		console.log("dialog Change");
		console.log(typeof handleCancel);
		handleCancel();
	}

	render(){
		const {id,button,title,handleCancel,children,dialog} =this.props;
		console.log("props");
		console.log(this.props);
		var display = dialog.status&&dialog.id===this.props.id?'block':'none';
		return (
			<div style={{display:display}}>
			<div className={styles['dialog']}
			
			>
				<div className={styles['dialog-head']}>{title}
				<span className={styles['dialog-cancel']} onClick={this.handleChange.bind(this)}
				>
				<FaTimesCircle/>
				</span>
				</div>
				
				<div>
				{children}
				</div>
			</div>

				<Mask handleCancel={handleCancel} id={id}/>
			
			</div>
			);
	}

}