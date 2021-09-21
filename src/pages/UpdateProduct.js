import Header from '../Header.js';
import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function UpdateProduct(props) {
    console.log('props', props.match.params.id);

    const [prodId, setProId] = useState('');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [file_path, setFilePath] = useState('');
    const [imgSrc, setImgSrc] = useState('');

    useEffect(() => {
        async function getProduct() {
            const response = await fetch('http://localhost:8000/api/getproduct/' + props.match.params.id);
            const result = await response.json();
            console.log(result);
            setProId(result.id);
            setName(result.name);
            setPrice(result.price);
            setDescription(result.description);
            setFilePath(result.file_path);
            setImgSrc('http://localhost:8000/' + result.file_path);
        };

        getProduct();
        // console.log(data);
    }, []);

    async function update() {
        let item = { prodId, name, description, price, file_path };
        console.log(item);
        const formData = new FormData();
        formData.append('id', prodId);
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('prod_file', file_path);

        console.log(formData);
        const response = await fetch('http://localhost:8000/api/updateproduct', {
            method: 'POST',
            body: formData
        });
        const result = await response.FormData;
        return result;
    }

    function onImageChange(e) {
        if (e.target.files && e.target.files[0]) {
            setFilePath(e.target.files[0]);
            setImgSrc(URL.createObjectURL(e.target.files[0]));
        }
    }

    return (
        <div>
            <Header />
            <h1>Update Product Page</h1>
            <div className='col-sm-10 mx-auto'>
                <input type='text' onChange={(e) => setName(e.target.value)} value={name} className='form-control' id='prod_name' placeholder='Enter Product Name'></input><br />
                <input type='text' onChange={(e) => setPrice(e.target.value)} value={price} className='form-control' id='prod_price' placeholder='Enter Product Price'></input><br />
                <input type='text' onChange={(e) => setDescription(e.target.value)} value={description} className='form-control' id='prod_desscription' placeholder='Enter Product Description'></input><br />
                <input type='file' onChange={(e) => onImageChange(e)} className='form-control' id='prod_filePath'></input><br />
                <img style={{ width: 100 }} src={imgSrc} alt={name} /><br />
                <Button className='btn btn-primary' onClick={() => update()}>Update</Button>
            </div>
        </div >
    )
}

export default withRouter(UpdateProduct)