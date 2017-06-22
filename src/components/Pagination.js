import React from 'react';

const Pagination = (props) => {
  const rest = Object.assign({}, props);
  delete rest.current;
  delete rest.total;
  return (
    <div {...rest}>
      <a id={1} onClick={props.onClick}>{props.linkFirst || '«'}</a>
      <a id={Math.max(1, props.current-1)} onClick={props.onClick}>{props.linkPrevious || '‹'}</a>
      {(props.current > 2) ? <a id={props.current-2} onClick={props.onClick}>{props.current-2}</a> : null}
      {(props.current > 1) ? <a id={props.current-1} onClick={props.onClick}>{props.current-1}</a> : null}
      <a id={props.current} onClick={props.onClick} className='current'>{props.current}</a>
      {(props.current < props.total) ? <a id={props.current+1} onClick={props.onClick}>{props.current+1}</a> : null}
      {(props.current < props.total-1) ? <a id={props.current+2} onClick={props.onClick}>{props.current+2}</a> : null}
      <a id={Math.max(props.total, props.current+1)} onClick={props.onClick}>{props.linkNext || '›'}</a>
      <a id={props.total} onClick={props.onClick}>{props.linkLast || '»'}</a>
    </div>
  );
}

export default Pagination;