import React from 'react';

const ListItem = (props) => (
  <div>
    <table>
  <tr>
    <th>City</th>
    <th>State</th> 
    <th>Time</th>
    <th>Tempratue</th>
    <th>Air Quality Index</th>
  </tr>
  <tr>
    <td>{props.item.cityName}</td>
    <td>{props.item.state}</td> 
    <td>{props.item.timeStamp}</td>
    <td>{props.item.temprature}</td>
    <td>{props.item.airQaulityIndex}</td>
  </tr>
</table>
  </div>
)

export default ListItem;