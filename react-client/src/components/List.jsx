import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> List Component </h4>
    There are { props.items.length } items.
    { props.items.map(item => <ListItem item={item}/>)}
  </div>
)

// const List = (props) => (
//   <div>
//     <h4> List Component </h4>

//   </div>
// )

export default List;