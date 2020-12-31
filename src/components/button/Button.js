import React from 'react';
import styles from './Button.module.css'

const Button = ({text, handler}) => {
  return (
      <button className={styles.button} onClick={handler}>
        {text}
      </button>
  );
};

export default Button;
