import React, { useState, useEffect } from 'react';
import { validate as barcodeValidate } from '../../helper/validators/barcode';
import { Form, Input, Label, Button, Col, Table } from 'reactstrap';
import ExportCsv from './export-csv';
import beep from '../../resources/sounds/beep.mp3'
import {save, load} from '../../helper/storage/estoque-storage/index'

function ContaEstoque() {

  const [products, setProducts] = useState([])
  const [barcodeInput, setBarcodeInput] = useState('');
  const [barcodeInputError, setBarcodeInputError] = useState(false);

  useEffect(() => {
    setBarcodeInputError(!barcodeValidate(barcodeInput));
  }, [barcodeInput])

  useEffect(() => {
    const storedProducts = load();
    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      setProducts([])
    }
  }, []);

  useEffect(() => {
    if(products?.length > 0) {
      save(products);
    }
  }, [products]);

  const handleProductSubmit = e => {
    e.preventDefault();

    if (barcodeInputError || !barcodeInput) {
      return;
    }

    const existingProduct = products.find(p => p.barcode === barcodeInput);

    if (existingProduct) {
      setProducts(products.map(p => {
        if (p.barcode === barcodeInput) {
          return { ...p, qty: p.qty + 1, date: new Date() }
        }
        return p;
      }));
    } else {
      setProducts([...products, { barcode: barcodeInput, qty: 1, date: new Date() }]);
    }
    setBarcodeInput('');
    setBarcodeInputError(false);
    var audio = new Audio(beep);
    audio.play();
  }

  const handleDeleteItem = (index) => {
    console.log(index);

    const productsAfter = products.map(p => p);
    productsAfter.splice(index, 1);

    setProducts(productsAfter);
  }

  const handleSubtractItem = (index) => {
    const productsAfter = products.map((p, pIndex) => {
      if (index === pIndex) {
        return {
          ...p,
          qty: p.qty - 1,
        }
      }
      return p;
    }).filter(p => p.qty > 0);

    setProducts(productsAfter);
  }

  const productsCount = products?.length > 0 ? products.reduce((total, product,) => total + product.qty, 0) : 0;

  return (
    <div className="App"
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}
    >
      <div style={{

      }}>
        <div
          className={'p-3'}
        >
          <Button onClick={() => setProducts([])} className={'mr-3'}>
            Novo
        </Button>
          <ExportCsv
            products={products}
          />
        </div>
        <Col xs={12} sm={4} md={3} xl={2} className={'pb-3'}>
          <Form onSubmit={handleProductSubmit}>
            <Label for='barcodeInput'>Código de Barras</Label>
            <div style={{ display: 'flex' }}>
              <div style={{ flex: 1 }}>
                <Input
                  type='barcode'
                  name='barcodeInput'
                  id='barcodeInput'
                  onChange={e => setBarcodeInput(e.target.value)}
                  value={barcodeInput}
                  invalid={barcodeInputError}
                />
              </div>
              <Button type={'submit'} className={'ml-3'}>
                Ir
            </Button>
            </div>
          </Form>
          Total de Produtos: {productsCount}
        </Col>
      </div>
      <div style={{
        flex: 1,
        overflowX: 'auto'
      }}>
        <Col xs={12} md={6} xl={4}>
          <Table dark>
            <thead>
              <tr>
                <th>
                  Cód. de Barras
              </th>
                <th>
                  Quantidade
              </th>
                <th>
                  Ações
              </th>
              </tr>
            </thead>
            <tbody>
              {products.sort((a, b) => b.date - a.date).map((product, index) => (
                <tr key={product.barcode}>
                  <td>
                    {product.barcode}
                  </td>
                  <td>
                    {product.qty}
                  </td>
                  <td>
                    <Button size="sm" onClick={() => handleSubtractItem(index)}>
                      -
                  </Button>
                    <Button size="sm" className={'ml-2'} onClick={() => handleDeleteItem(index)}>
                      x
                  </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </div>
    </div>
  );
}

export default ContaEstoque;
