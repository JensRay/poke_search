import React from 'react';

import styles from './dropdown.module.scss';

interface DropdownProps {
  dropdown_list: (string | number)[];
  toggleList: () => void;
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  isActive: boolean;
  type: string | number;
  title: string;
}

const Dropdown: React.FC<DropdownProps> = ({ dropdown_list, toggleList, handleClick, isActive, type, title }: DropdownProps) => {
  const returnSubtitle = (n: string | number) => {
    if (typeof type === 'number') {
      return `Show ${n} results`
    } else {
      return n
    }
  }

  return (
    <div>
      <button
        className={`${styles.list__dropdown__button} box_shadow__theme inner_background__theme border__theme`}
        onClick={toggleList}
      >
        <span className="grayed_text__theme">{title}</span>
        {!isActive ? (
          <span className="third_text__theme">&#65088;</span>
        ) : (
          <span className="third_text__theme">&#65087;</span>
        )}
      </button>
      {isActive ? (
        <div
          className={`${styles.list__dropdown_container} box_shadow__theme inner_background__theme`}

          >
          {dropdown_list.map((n) => {
            return (
              <button
                onClick={handleClick}
                key={n}
                value={n}
                className={
                  type !== n
                    ? styles.list__dropdown__active + ' text__theme inner_background__theme'
                    : "grayed_text__theme inner_background__theme"
                }
              >
                {returnSubtitle(n)}
              </button>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  )
};

export default Dropdown;
