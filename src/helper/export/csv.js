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
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, `Dados ${new Date().toLocaleDateString()}`);
    } else {
        link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", `Dados ${new Date().toLocaleDateString()}`);
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