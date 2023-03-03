import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import FileIcon from "components/icons/file-icon";

const DueDiligence = (props) => {
const { due_diligence } = props;

  return (
    <div className='due-diligence-table mt-3'>
      <Table striped borderless className='align-middle mb-0'>
        <tbody>
          {due_diligence?.map((item, index) => 
            <tr key={index}>
              <td className='px-3 fs-16'>{item.name}</td>
              <td className='px-3 text-end'>
                <a href={item.file} target="_blank"><FileIcon /></a>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default DueDiligence;