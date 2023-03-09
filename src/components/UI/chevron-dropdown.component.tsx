import React from 'react';

import styles from './chevron-dropdown.module.scss';

interface ChevronDropdownProps {
  isActive: boolean;
}

const ChevronDropdown: React.FC<ChevronDropdownProps> = ({isActive}) => {
  return (
    <>
      {!isActive ? (
        <span className={`third_text__theme ${styles.chevron_dropdown}`}>&#65088;</span>
      ) : (
        <span className={`third_text__theme ${styles.chevron_dropdown} ${styles.open}`}>&#65087;</span>
      )}
    </>
  )
};

export default ChevronDropdown;
