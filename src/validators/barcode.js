const validate = (barcode) => {
    // const re = new RegExp("^[0-9]{13}$");
    // if (!re.test(barcode)) {
    //     return false;
    // }
    // var somaPares = barcode[1] + barcode[3] + barcode[5] + barcode[7] + barcode[9] + barcode[11];
    // var somaImpares = barcode[0] + barcode[2] + barcode[4] + barcode[6] + barcode[8] + barcode[10];
    // var resultado = somaImpares + somaPares * 3;
    // var digitoVerificador = 10 - resultado % 10;

    // return digitoVerificador !== barcode[12];
    return true;
}

export {
    validate
};