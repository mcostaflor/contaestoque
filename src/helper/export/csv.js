function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

const exportCsv = (data) => {
    var dataString = '';

    if (!data.length || !data.length > 0) {
        return;
    }

    data.forEach(item => {
        dataString += `${pad(item.barcode, 15)}  ${pad(item.qty, 5)}\r\n`;
    });

    console.log(dataString);

    var link = document.createElement("a");
    var blob = new Blob([dataString], { type: 'text/csv;charset=utf-8;' });
    var name = prompt('Nome do arquivo', `Dados ${new Date().toLocaleDateString()}`);
    if (navigator.msSaveOrOpenBlob) { // IE 10+
        navigator.msSaveOrOpenBlob(blob, name);
    } else {
        link = document.createElement("a");
        if (link.download !== undefined) { 
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", name);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

export {
    exportCsv
}