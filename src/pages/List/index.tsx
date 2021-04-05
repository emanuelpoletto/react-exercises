import React, { useState, useMemo, useCallback, useEffect } from 'react';

import './styles.scss';

import data from './data';

function ListContainer() {
  const [columns, setColumns] = useState(1);
  const [isStriped, setIsStriped] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const limitNumberOfColumns = useCallback(
    (columns = data.length) => {
      let windowColumns = Math.floor(windowWidth / 300);
      windowColumns = Math.min(windowColumns, data.length);

      columns = Math.max(columns, 1);
      columns = Math.min(columns, windowColumns);

      return columns;
    },
    [windowWidth]
  );

  const handleInputColumnsOnChange = useCallback(
    (event) => {
      let columns = Number(event.target.value);
      setColumns(limitNumberOfColumns(columns));
    },
    [limitNumberOfColumns]
  );

  useEffect(() => {
    function handleResize() {
      setWindowWidth((currentWindowWidth) =>
        currentWindowWidth !== window.innerWidth
          ? window.innerWidth
          : currentWindowWidth
      );
      setColumns((currentColumns) => limitNumberOfColumns(currentColumns));
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [limitNumberOfColumns]);

  return (
    <>
      <header>
        <label>
          <span># of columns: </span>
          <input
            id='columns'
            type='number'
            min='1'
            max={data.length}
            value={columns}
            onChange={handleInputColumnsOnChange}
          />
        </label>
        &nbsp;
        <label>
          <input
            type='checkbox'
            onChange={(e) => setIsStriped(Boolean(e.target.checked))}
            checked={isStriped}
          />
          <span> striped</span>
        </label>
      </header>
      <div className='list-container'>
        <List items={data} columns={columns} striped={isStriped} />
      </div>
    </>
  );
}

interface ItemProps {
  name: string;
  location: string;
}

interface TableProps {
  items: ItemProps[];
  columns?: number;
  striped?: boolean;
}

function List({ items, columns = 1, striped = true }: TableProps) {
  const listItems = useMemo(
    () =>
      items.map((item, index) => {
        const classname = `list-item ${(index + 1) % 2 > 0 ? 'odd' : 'even'}`;

        return (
          <li key={item.name} className={classname}>
            <span className='item-name'>
              {index + 1}. {item.name}
            </span>
            <span className='item-location'>{item.location}</span>
          </li>
        );
      }),
    [items]
  );

  const listColumns = useMemo(() => {
    const ratio = Math.floor(items.length / columns);
    const rest = items.length % columns;
    const cols = [];

    let start = 0;
    let end = 0;

    for (let i = 0; i < columns; i++) {
      start = end;
      end = start + ratio;
      if (rest && i < rest) {
        end++;
      }
      cols.push({ start, end });
    }

    return cols;
  }, [items, columns]);

  return (
    <>
      {listColumns.map((column, index) => {
        return (
          <ul key={index} className={striped ? 'striped' : ''}>
            {listItems.slice(column.start, column.end)}
          </ul>
        );
      })}
    </>
  );
}

export default ListContainer;
