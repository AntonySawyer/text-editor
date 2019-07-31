import React from 'react';
import './Tag.scss';

export default ({ title }) => {
  return (
    <div className="tag-wrapper">
      <span>{ title }</span>
      <button className="btn btn-red">del</button>
    </div>
  )
}