import React,{Component} from 'react';
import styles from './Calendar.scss';

import {FaArrowLeft,FaArrowRight} from 'react-icons/lib/fa';

import classNames from 'classNames';

export default class Carlendar extends Component{

	constructor(props){
		super(props);
	}
	
	handleChangeCurrent(index){
		const {changeCurrent} = this.props.actions;
		return ()=>changeCurrent(index);
	}
	renderHead(){
		const {current} = this.props.calendar;
		return (
			<thead>
				<tr  className={styles['table-caption']}>
					<th onClick={this.handleChangeCurrent(3)}><FaArrowLeft/></th>
					<th onClick={this.handleChangeCurrent(1)}><FaArrowLeft/></th>
					<th colSpan="3"
					className={styles['th-time']}
					>
					{`${current.getFullYear()}年${current.getMonth()+1}月`}
					</th>
					<th onClick={this.handleChangeCurrent(2)}><FaArrowRight/></th>
					<th onClick={this.handleChangeCurrent(4)} ><FaArrowRight/></th>
				</tr>
				<tr>
					<th>日</th>
					<th>一</th>
					<th>二</th>
					<th>三</th>
					<th>四</th>
					<th>五</th>
					<th>六</th>
				</tr>
			</thead>
			);
	}

	getClassName(date){
		const {current,selected} = this.props.calendar;
		let cx=classNames.bind(styles);
		// 用classNames 方法 组合元素的多个类名。
		return cx({
			[styles['last-month']]:(date.getMonth()<current.getMonth())&&(date.getFullYear()<=current.getFullYear()),
			[styles['current-month']]:date.getMonth()===current.getMonth(),
			[styles['next-month']]:date.getMonth()>current.getMonth()||date.getFullYear()>current.getFullYear(),
			['table-td']:true,
			[styles['selected']]:selected&&date.getMonth()===selected.getMonth()
			&&date.getFullYear()===selected.getFullYear()
			&&date.getDate()===selected.getDate()
		});

	}

	handleSelectDay(date){
		const {current} = this.props.calendar;
		const {selectDate,selectTime,switchCalendar} = this.props.actions;
		let selected = new Date(date);
		if (date.getMonth()===current.getMonth()) {
			return ()=>{
				selectDate(selected);
				selectTime(selected);
				switchCalendar();
		};
	}
	}

	renderBody(){
		const {current,selected} = this.props.calendar;
		let date = new Date(current);
		let start = new Date();
		start.setDate(1);
		date.setDate(start.getDate()-start.getDay());
		let td=[];
		let tr= [];

		for(let i=1;i<=6;i++){
			
			for(let j=1;j<=7;j++){
					
				td.push(<td key={`td-${i}-${j}`} 
					className={this.getClassName(date)}
					onClick={this.handleSelectDay(date)}
					>
					{date.getDate()}
					</td>);
				date.setDate(date.getDate()+1);
			}
			tr.push(<tr key={`tr-${i}`}>{td}</tr>);
			td = [];

		}
		return (
				<tbody>
				{tr}

				</tbody>

			);

	}
	switchCalendar(){
		const {switchCalendar} = this.props.actions;
		return ()=>switchCalendar();
	}
	render(){
		console.log("calendar");
		console.log(this.props.calendar);

		const {selected,show} = this.props.calendar;
		console.log("selected"+selected);
		return (
			<div className={styles['calendar-top']}>
		
			<table className={classNames(styles['calendar-table'],{[styles['show']]:show})}>
			{this.renderHead()}
			{this.renderBody()}
			</table>
			<input name='carlendar' 
			onClick={this.switchCalendar()}
			value ={selected?`${selected.getFullYear()}年${selected.getMonth()+1}月${selected.getDate()}`:''}
			className="datepicker"/>
			</div>
			);
	}
}


