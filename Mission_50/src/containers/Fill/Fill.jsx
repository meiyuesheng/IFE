import React,{Component} from 'react';
import * as questionnairesActions from '../../actions/questionnaires';
import {connect} from 'react-redux';
import {RADIO,CHECKBOX,TEXT} from '../../constants/QuestionType';
import styles from './Fill.scss';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router';

class Fill extends Component{


	constructor(props){
		super(props);
	}

	renderQuestion(){
		const {question} = this.props.state.edit;
		
		return question.map((item,index)=>{
			if(item.type===RADIO||item.type===CHECKBOX){
				return (
						<div key={`question-${index}`} className={styles['question']}>
									<span>{`Q${index+1}`}</span>
									<div
									className={styles['question-title']}
									>
									{item.title}
									</div>
								{this.renderOption(index)}
						</div>
					);
			}
			else if(item.type===TEXT){
				return (
								<div key={`question-${index}`} key={index} className={styles['question']}>
									<span>{`Q${index+1}`}</span>
									<div
									className={styles['question-title']}
									>
									{item.title}
									</div>
								{this.renderOption(index)}
								<div>{item.required?`此题为必填`:`此题为选填`}</div>
								</div>
							);
			}

		});
	}

	handleFill(type,questionIndex,optionIndex){
		const {fillRadio,fillCheckbox,fillText} = this.props.actions;
		if (type===RADIO) {
			return ()=>fillRadio(questionIndex,optionIndex);
		}
		else if(type===CHECKBOX){
			return ()=>fillCheckbox(questionIndex,optionIndex);
		}
		if (type===TEXT) {
			return (event)=>fillText(questionIndex,event.target.value);
	
		}

	}

	renderOption(index){
		const {question,qindex,oindex,editing} = this.props.state.edit;

		if (question[index].type===TEXT) {
			return (
				<div key={`text-${index}`} className={styles['question-option']}>
				<textarea
				type="textarea"
				onChange={this.handleFill(TEXT,index)}
				/>
				</div>
				);

		};

		if (question[index].type===RADIO) {
			let option = question[index].answer.map((item,i)=>{
				return (
					<div key={`radio-${i}`} className={styles['question-option']}>
						<label htmlFor={`radio-${i}`} className={styles.label} ><input type='radio' id={`radio-${i}`} name={`radio-${index}`}
						onClick={this.handleFill(RADIO,index,i)}
						/>{item}
						</label>
					</div>
					);
			});

			return <form>{option}</form>;
		}
		else if(question[index].type===CHECKBOX){
			let check = question[index].answer.map((item,i)=>{
				return (
					<div key={`checkbox-${i}`} className={styles['question-option']}>
					<label htmlFor={`checkbox-${i}`} className={styles.label} >
						<input  id={`checkbox-${i}`} type='checkbox' name={`checkbox-${index}`}
						onClick={this.handleFill(CHECKBOX,index,i)}
						/>{item}
						</label>
					</div>
					);

			});

			return <form>{check}</form>;
		};


	}	
	
	handleSubmit(){

		const {submitQuestionnaire} =this.props.actions;
		return ()=>submitQuestionnaire();
	}

	render(){
		const {edit} = this.props.state;
		return (
			<div>
				<h2 className={styles['questionnaire-title']}>{edit.title}</h2>
				<hr/>
				{this.renderQuestion()}

				<hr/>
				<div className={styles['foot']}>
				<Link to='/'>
				<input 
				onClick={this.handleSubmit()}
				className={styles['button']} type="button" value="提交问卷"/>
				</Link>
				</div>
			</div>
			);
	}
}

function mapStateToProps(state) {
	return{
		state:state.questionnaires
	};

}

function mapDispatchToProps(dispatch) {
	return {
		actions:Object.assign({},bindActionCreators(questionnairesActions,dispatch))
	};
}


export default connect(mapStateToProps,mapDispatchToProps)(Fill);