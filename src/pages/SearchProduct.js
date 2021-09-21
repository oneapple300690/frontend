import Header from '../Header.js';
import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';

function SearchProduct() {

    const [data, setData] = useState("");
    console.log(data);
    let product_number = 1;

    async function search(key) {
        if (key) {
            // initial Abort Controller and Signal to fetch()
            const controller = new AbortController();
            const signal = controller.signal;
            const timeoutId = setTimeout(() => controller.abort, 8000);

            try {
                const response = await fetch("http://localhost:8000/api/searchproduct/" + key, {
                    method: 'GET',
                    timeout: 8000,
                    signal: signal
                });
                clearTimeout(timeoutId);
                const result = await response.json();
                setData(result);
                console.log(result);
                return result;
            } catch (error) {
                console.log(error.name);
            }
        }
    }
    return (
        <div>
            <Header />
            <h1>Search Product</h1>
            <div className='col-sm-10 mx-auto'>
                <input type='text' onChange={(e) => search(e.target.value)} className='form-control' placeholder='Search Product'></input><br />
                {
                    data ?
                        <>
                            <Table responsive striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Price</th>
                                        <th>Description</th>
                                        <th>File Path</th>
                                        <th>Updated At</th>
                                        <th>Created At</th>
                                        {/* <th colSpan='2'>Operations</th> */}
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((item) =>
                                            <tr>
                                                <td>{product_number++}</td>
                                                <td>{item.id}</td>
                                                <td>{item.name}</td>
                                                <td>{item.price}</td>
                                                <td>{item.description}</td>
                                                <td><img style={{ width: 100 }} src={'http://localhost:8000/' + item.file_path} alt={item.name} /></td>
                                                <td>{item.updated_at}</td>
                                                <td>{item.created_at}</td>
                                                {/* <td><Button variant='danger' onClick={() => deleteProduct(item.id)}>Delete</Button></td> */}
                                                {/* <td>
                                        <Link to={'./updateProd/' + item.id}><Button variant='info' >Update</Button></Link>
                                    </td> */}
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </>
                        : null
                }

            </div>
        </div>
    )
}

export default SearchProduct