import React from 'react';

const ListItem = (props) => (
  <div>
    <table>
  <tr>
    <td><strong>City:</strong>{props.item.cityName}</td>
    <td><strong>State:</strong>{props.item.state}</td> 
    <td><strong>Time:</strong>{props.item.timeStamp}</td>
    <td><strong>Tempratue:</strong>{props.item.temprature}</td>
    <td><strong>Air Quality Index:</strong>{props.item.airQaulityIndex}</td>
  </tr>
</table>
  </div>
)

export default ListItem;