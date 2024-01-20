export const save = (products) => {
    console.log("saving...", products)
    localStorage.setItem('products', JSON.stringify(products));
}

export const load = () => {
    const storedProducts = JSON.parse(localStorage.getItem('products'))
    console.log("loading...", storedProducts)
    return storedProducts;
}