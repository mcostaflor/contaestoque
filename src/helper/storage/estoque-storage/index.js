export const saveProducts = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
}

export const loadProducts = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products'))
    return storedProducts;
}