
import React,{Component} from 'react';

import styles from './Mask.scss';


export default class Mask extends Component{



	render(){

		return (
			<div className={styles['mask']}
			onClick={this.props.handleCancel}
			>
				这里是mask
			</div>
			);
	}
}
