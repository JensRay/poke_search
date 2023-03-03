import React from 'react';
import { Link } from 'react-router-dom';

import styles from './button.module.scss';

interface ButttonProps { text: string; text2?: string; to: string; }

const Button: React.FC<ButttonProps> = ({ text, text2, to }: ButttonProps) => {
  return (
    <Link to={to} className={`${styles.custom_button} button__theme`}>
      <span>{text}</span>
      <span>{text2}</span>
    </Link>)
};

export default Button;
