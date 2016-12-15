import React,{Component} from 'react';

import styles from './Main.scss';


function Main({children}) {
	
	return (
		<div className={styles['main']}>
		{children}
		</div>
		);
}

export default Main;