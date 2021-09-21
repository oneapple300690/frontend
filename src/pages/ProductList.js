import Header from '../Header';
import React, { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ProductList() {
    const [data, setData] = useState([]);
    let product_number = 1;

    useEffect(() => {
        getAllProducts();
    }, []);

    async function getAllProducts() {
        const response = await fetch("http://localhost:8000/api/listproduct");
        setData(await response.json());
    }

    console.warn("RESULT", data);

    async function deleteProduct(id) {
        const response = await fetch('http://localhost:8000/api/deleteproduct/' + id, {
            method: 'DELETE'
        });
        const result = await response.json();
        console.log(result);
        getAllProducts();
    };

    // async function getAllProducts() {
    //     const response = await fetch("http://localhost:8000/api/listproduct", {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         }
    //     });

    //     const result = await response.json();
    //     return result;
    // }

    // const productList = getAllProducts();

    return (
        <div>
            <Header />
            <h1>Product List</h1>
            <div className='col-sm-10 mx-auto'>
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
                            <th colSpan='2'>Operations</th>
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
                                    <td><Button variant='danger' onClick={() => deleteProduct(item.id)}>Delete</Button></td>
                                    <td>
                                        <Link to={'./updateProd/'+item.id}><Button variant='info' >Update</Button></Link>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ProductList;