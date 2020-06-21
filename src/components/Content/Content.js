import React, { useState } from 'react';
import './Content.css';
import { isEmpty, isArrayNotEmpty } from '../../helpers/miscellenous';

const Content = (props) => {

    const [data, setData] = useState([]);

    const [controls, setControls] = useState({
        delimiter: ',',
        numberOfLines: '2'
    });

    const controlsChangeHandler = (event) => {
        const updatedControls = { ...controls };
        updatedControls[event.target.id] = event.target.value;
        setControls(updatedControls);
    };

    const getTableData = () => {
        const delimitedData = data.filter(item => item.indexOf(controls.delimiter) !== -1 && item.split(controls.delimiter))
        if (isArrayNotEmpty(delimitedData)) {
            return (
                delimitedData.slice(0, controls.numberOfLines).map((item, index) => {
                    return (
                        <tr key={index}>
                            {
                                isEmpty(controls.delimiter) ?
                                    <td key={index} style={{ textAlign: 'center' }}>{item}</td>
                                    :
                                    item.split(controls.delimiter).slice(0, 4).map(data => <td key={data}>{data}</td>)
                            }
                        </tr>
                    );
                })
            );
        } else {
            return (
                data.slice(0, controls.numberOfLines).map((item, index) => {
                    return (
                        <tr key={index}>
                            <td key={index} style={{ textAlign: 'center' }}>{item}</td>
                        </tr>
                    );
                })
            );
        }
    };

    const uploadFile = (event) => {
        if (event.target.files[0]) {
            const data = new FormData()
            data.append('file', event.target.files[0]);
            console.log('==event.target.files[0]==', event.target.files[0], data)
            fetch('http://localhost:3000/upload-file', {
                method: 'POST',
                body: data
            })
                .then(response => {
                    return response.json()
                })
                .then(body => {
                    console.log('==body==', body.entity)
                    setData(body.entity.split('\n'));
                });
        }
    };

    return (
        <div className="content" style={{ width: '80%', padding: '10%' }}>
            <div className="controls">
                <div className="delimiter">
                    <label>Delimiter</label>
                    <input
                        type="text"
                        id='delimiter'
                        value={controls.delimiter}
                        onChange={(event) => controlsChangeHandler(event)} />
                </div>
                <div className="lines">
                    <label>Lines</label>
                    <input
                        type="number"
                        id='numberOfLines'
                        value={controls.numberOfLines}
                        onChange={(event) => controlsChangeHandler(event)} />
                </div>
                <input
                    type="file"
                    accept=".txt, .csv, .pdf"
                    onChange={(event) => uploadFile(event)}
                /><br />
            </div><br />
            <div className="total-lines">Total {data.length} lines found</div>
            <table>
                <tbody>
                    {getTableData()}
                </tbody>
            </table>
        </div>
    );
};

export default Content;
