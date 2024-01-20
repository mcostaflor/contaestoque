import React, { useState, useEffect } from 'react';
import { validate as barcodeValidate } from '../../helper/validators/barcode';
import ExportCsv from './export-csv';
import beep from '../../resources/sounds/beep.mp3'
import { save, load } from '../../helper/storage/estoque-storage/index'
import { Button, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

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
    if (products?.length > 0) {
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
    <Container maxWidth="md" sx={{ backgroundColor: '#ccc', padding: 1, minHeight: '100vh' }}>
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>
            <Stack direction={'row'} spacing={1}>
              <Button variant='contained' onClick={() => setProducts([])}>
                Novo
              </Button>
              <ExportCsv
                products={products}
              />
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>
            <Stack direction={"column"} spacing={1}>
              <form onSubmit={handleProductSubmit}>
                <TextField
                  type='barcode'
                  onChange={e => setBarcodeInput(e.target.value)}
                  value={barcodeInput}
                  invalid={barcodeInputError}
                  label="Código de Barras"
                />
              </form>
              <Typography>
                Total de Produtos: {productsCount}
              </Typography>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      Cód. de Barras
                    </TableCell>
                    <TableCell>
                     Quantidade
                    </TableCell>
                    <TableCell>
                      Ações
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {products.sort((a, b) => b.date - a.date).map((product, index) => (
                  <TableRow key={product.barcode}>
                    <TableCell>
                      {product.barcode}
                    </TableCell>
                    <TableCell>
                      {product.qty}
                    </TableCell>
                    <TableCell>
                      <Button variant='contained' size='small' onClick={() => handleSubtractItem(index)}>
                        -
                      </Button>
                      <Button variant='contained' className={'ml-2'} onClick={() => handleDeleteItem(index)}>
                        x
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContaEstoque;
