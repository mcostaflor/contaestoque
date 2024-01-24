import React, { useState, useEffect } from 'react';
import { validate as barcodeValidate } from '../../helper/validators/barcode';
import beep from '../../resources/sounds/beep.mp3'
import { saveProducts, loadProducts } from '../../helper/storage/estoque-storage/index'
import { Box, Button, ButtonGroup, Container, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import RemoveIcon from '@mui/icons-material/Remove';
import ExportTxt from './export-txt';
import ConfigMenu from './config-menu';

function ContaEstoque() {

  const [products, setProducts] = useState([])
  const [barcodeInput, setBarcodeInput] = useState('');
  const [barcodeInputError, setBarcodeInputError] = useState(false);

  useEffect(() => {
    setBarcodeInputError(!barcodeValidate(barcodeInput));
  }, [barcodeInput])

  useEffect(() => {
    const storedProducts = loadProducts();
    if (storedProducts) {
      setProducts(storedProducts);
    } else {
      setProducts([])
    }
  }, []);

  useEffect(() => {
    if (products?.length > 0) {
      saveProducts(products);
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

  const handleClearButton = () => {
    if(window.confirm("Deseja iniciar uma nova contagem?")) {
      setProducts([]);
    };
  }

  const productsCount = products?.length > 0 ? products.reduce((total, product,) => total + product.qty, 0) : 0;

  return (
    <Container maxWidth="sm" sx={{ padding: 1 }}>
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>
            <Stack direction={'row-reverse'} spacing={1}>
              <ButtonGroup>

              <Button variant='outlined' onClick={handleClearButton}>
                Novo
              </Button>
              <ExportTxt
                products={products}
                />
                <ConfigMenu/>
                </ButtonGroup>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>
            <Grid container alignItems={"center"} spacing={1}>
              <Grid item xs={12}>
                <form onSubmit={handleProductSubmit}>
                  <TextField
                    type='barcode'
                    onChange={e => setBarcodeInput(e.target.value)}
                    value={barcodeInput}
                    invalid={barcodeInputError}
                    label="Código de Barras"
                    fullWidth
                  />
                </form>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ padding: 1 }}>
            <TableContainer sx={{ borderRadius: 1, backgroundColor: '#eee',minHeight: 350, maxHeight: 250 }}>
              <Table size='small' >
                <TableHead sx={{ backgroundColor: '#ddd', borderRadius: '50px' }}>
                  <TableRow>
                    <TableCell>
                      Cód.
                    </TableCell>
                    <TableCell>
                      Quantidade
                    </TableCell>
                    <TableCell align='right'>
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
                      <TableCell align='right'>
                        <IconButton size='small' onClick={() => handleSubtractItem(index)}>
                          <RemoveIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteItem(index)}>
                          <DeleteForeverIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box margin={1}  textAlign={"end"}>
              <Typography>
                Total de Produtos: {productsCount}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ContaEstoque;
