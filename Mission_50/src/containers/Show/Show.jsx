
import React,{Component} from 'react';

import  {PieChart, Pie, Legend, Tooltip,BarChart, Bar, XAxis, YAxis, CartesianGrid} from 'recharts';

import {connect} from 'react-redux';

import {bindActionCreators} from 'redux';

import styles from './Show.scss';

import {RADIO,CHECKBOX,TEXT} from '../../constants/QuestionType';

import * as questionnairesActions from '../../actions/questionnaires';

import {Link} from 'react-router';
class Show extends Component{

	
	renderPie(arr,index){
		const {edit} = this.props.state;
		const data = arr.map((item,i)=>{
			return {name:edit.question[index].answer[i],value:item};
		})

		return (
			<PieChart width={600} height={400} 
			isAnimationActive={true}
			margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        	<Pie isAnimationActive={false} data={data} 
        	cx={200} cy={200} outerRadius={80} fill="#8884d8" label/>
        	<Tooltip/>
       		</PieChart>
			)
	}

	renderBar(arr,index){
		const {edit} = this.props.state;
		const data =arr.map((item,i)=>{
			return  {name: edit.question[index].answer[i], uv:item};
		})

		return (
		    	<BarChart width={600} height={300} data={data}
		            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
		       <XAxis dataKey="name"/>
		       <YAxis/>
		       <CartesianGrid strokeDasharray="3 3"/>
		       <Tooltip/>
		       <Bar dataKey="uv" fill="#82ca9d" />
		      </BarChart>
    	);
	}

	renderGraph(type,index){
		const {data} = this.props.state.edit;
		var arr=[0,0,0,0];
		if (type===RADIO) {
			data.forEach((item,i)=>{
				console.log("数据：");
				console.log(item[index]);
				arr[parseInt(item[index])]++;
			})
			//问卷 data[1][]
			return this.renderPie(arr,index);

		}
		if (type===CHECKBOX) {
			data.forEach((item,i)=>{
				item[index].forEach((d,j)=>{
					arr[d]++;
				})
			})

			return this.renderBar(arr,index);
		}
		if(type===TEXT){
			data.forEach((item,i)=>{
				if (item[index]!=='') {
					arr[0]++;
				}
			});
			console.log("文本");
			console.log(arr[0]);
			return this.renderText(arr);
		}

	}

	renderText(arr){
		console.log("renderText");
		const data =[ {name:'文本题',uv:arr[0]}];

		return (
	    	<BarChart width={600} height={100} data={data}  layout="vertical"
	            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
	       <XAxis type="number"/>
	       <YAxis dataKey="name" type="category" />
	       <CartesianGrid strokeDasharray="3 3"/>
	       <Tooltip/>
	      	<Legend payload={[{value:"有效回答"}]}/>
	       <Bar dataKey="uv" fill="#82ca9d" />
	      </BarChart>
    );
  }
	
	
	renderQuestion(){
		const {question,data} = this.props.state.edit;

		return question.map((item,index)=>{

			return (
				<div key={`question-${index}`} className={styles['question']}>
									<span>{`Q${index+1}`}</span>
									<div
									className={styles['question-title']}
									>
									{item.title}
									</div>
								{this.renderGraph(item.type,index)}
						</div>
				);
		});

	}
	render(){
		const {edit} = this.props.state;
		return (
				<div>
				<h2>{edit.title}</h2>
				<hr/>

				{this.renderQuestion()}
				<hr/>
				<div className={styles.footer}>
				<Link to="/" >
				<button className={styles['button']} >返回</button>
				</Link>
				</div>
				</div>
			);

	}
}


function mapStateToProps(state) {
	return {
		state:state.questionnaires
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions:Object.assign({},bindActionCreators(questionnairesActions,dispatch))
	}
}


export default connect(mapStateToProps,mapDispatchToProps)(Show);