import React,{Component} from 'react';
import {Link} from 'react-router';
import styles from './Head.scss';
import {FaHandOLeft} from 'react-icons/lib/fa';
export default class Head extends Component{




	render(){

		return (
			<div className={styles['head']}
			>
			<h3 className={styles['title']}>问卷管理</h3>
			<Link to='/' >
			<h4 className={styles['link']}>我的问卷<FaHandOLeft size={30} /></h4>
			</Link> 
			</div>
			);
	}
}

