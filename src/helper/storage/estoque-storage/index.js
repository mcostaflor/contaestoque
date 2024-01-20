export const save = (products) => {
    localStorage.setItem('products', JSON.stringify(products));
}

export const load = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products'))
    return storedProducts;
}