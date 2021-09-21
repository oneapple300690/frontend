import Header from '../Header.js';
import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function AddProduct() {

    const [name, setProdName] = useState("");
    const [description, setProdDescription] = useState("");
    const [price, setProdPrice] = useState("");
    const [prod_file, setProdImage] = useState("");
    // const history = useHistory();

    async function add() {
        // initial Abort Controller and Signal to fetch()
        const controller = new AbortController();
        const signal = controller.signal;
        const timeoutId = setTimeout(() => controller.abort, 8000);

        try {
            console.log(name, description, price, prod_file);
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('prod_file', prod_file);

            let response = await fetch("http://localhost:8000/api/addproduct", {
                method: 'POST',
                body: formData,
                // headers: {
                //     'Content-Type': 'multipart/form-data',
                //     'Accept': 'multipart/form-data',
                // },
                timeout: 8000,
                signal: signal
            });

            // alert('Book Saved');
            clearTimeout(timeoutId);
            const result = await response.FormData;
            console.log('Data Return:', result);
            return result;

        } catch (error) {
            console.log(error.name);
        }

    }
    return (
        <div>
            <Header />
            <h1>Add Product Page</h1>
            <div className='col-sm-6 offset-sm-3'>
                <input type='text' onChange={(e) => setProdName(e.target.value)} value={name} className='form-control' placeholder='Enter Product Name'></input><br />
                <input type='text' onChange={(e) => setProdPrice(e.target.value)} value={price} className='form-control' placeholder='Enter Product Price'></input><br />
                <input type='text' onChange={(e) => setProdDescription(e.target.value)} value={description} className='form-control' placeholder='Enter Description'></input><br />
                <input type='file' onChange={(e) => setProdImage(e.target.files[0])} className='form-control' placeholder='Select Product Image'></input><br />
                <Button className='btn btn-primary' onClick={add}>Add Product</Button>
            </div>
        </div>
    )
}

export default AddProduct