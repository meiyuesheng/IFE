import React,{Component,isValidElement,cloneElement}from 'react';
import {Children} from 'react';
import styles from  './Table.scss';
const isInstanceOf = type => element => Object.prototype.toString.call(element) === `[object ${type}]`;
const isFunction = isInstanceOf('Function');
const styless = "palceholder";

const renderTh = (columns)=>columns.map((col,colIndex)=>{
	const {name,dataKey,width,align,th}=col.props;
	const props={dataKey,name,colIndex};
	let content;
	switch(true){
		case isValidElement(th):content=cloneElement(th);break;
		case isFunction(th):content=th(props);break;
		default:
		content=name || '';
	};
	return (
		<th key={`th-${colIndex}`}
		 	className={styles['table-th']}
		 	style={{width,textAlign:align}}

		>
		{content}
		</th>
		);


});

const renderTd = (row,columns,rowIndex,data)=>columns.map((col,colIndex)=>{


	const {dataKey,width,align,th,td,name} = col.props;
	const props ={data,row,dataKey,name,rowIndex};
	let content;
	switch(true){
		case isValidElement(td):content = cloneElement(td);break;
		case isFunction(td):content = td(props);break;
		default:
		content= row[dataKey];
		};
		return (
			<td key={`td-${rowIndex}-${colIndex}`}
			className={styless}
			style={{width,textAlign:align}}
			>
			{content}
			</td>
			);
	
});
	
const renderTr = (data,columns,)=>data.map((row,rowIndex)=>{


	return (
		<tr key={`tr-${rowIndex}`}
		className={styles['table-tr']}
		>
		{renderTd(row,columns,rowIndex,data)}
		</tr>
		);
});
const mapChildrenToArray = (children) => {
    const array = [];
    Children.forEach(children, child => array.push(child));
    return array;
};
class Table extends Component{

	constructor(props){
		super(props);
	}


//用一个列组件 来表示每一列，记录相关信息。
	render(){
		const {className,data,children} = this.props;
		const columns = mapChildrenToArray(children);

		return (
			<table className={styles['table']}>
				<thead>
					<tr className="table-thead-tr">
						{renderTh(columns)}
					</tr>
				</thead>
				<tbody>
					{renderTr(data,columns)}
				</tbody>
			</table>
			);
	}
}

export default Table;