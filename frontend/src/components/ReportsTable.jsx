import React from 'react'

export default function ReportsTable({ data }) {
  return (
    <div className='reports-table-wrapper'>
      <table className='main-table'>
        <thead>
          <tr>
            <th>id</th>
            <th>userId</th>
            <th>category</th>
            <th>urgency</th>
            <th>message</th>
            <th>imagePath</th>
            <th>sourceType</th>
            <th>createdAt</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 && data.map((item, index) => (
            <tr key={index} className='complaint-row'>
              <td>{item._id}</td>
              <td>{item.userId}</td>
              <td>{item.category}</td>
              <td>{item.urgency}</td>
              <td className='message-cell'>{item.message}</td>
              <td>{item.imagePath}</td>
              <td>{item.sourceType}</td>
              <td>{item.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}



