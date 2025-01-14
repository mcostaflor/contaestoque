function pad(num, size) {
    var s = num + "";
    while (s.length < size) s = "0" + s;
    return s;
}

const createFile = (data) => {
    var dataString = '';

    if (!data.length || !data.length > 0) {
        return;
    }

    data.forEach(item => {
        dataString += `${item.barcode},${item.qty}\r\n`;
    });

    return new Blob([dataString], { type: 'text/plain;charset=utf-8;' });
}

const downloadTxt = (data) => {
    const blob = createFile(data);

    if (!blob) return;

    var name = prompt('Nome do arquivo', `Dados ${new Date().toLocaleDateString()}`);
    var link = document.createElement("a");
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

const shareTxt = (data) => {
        const blob = createFile(data);

        if (!blob) return;

        var name = prompt('Nome do arquivo', `Dados ${new Date().toLocaleDateString()}.txt`);
        var file = new File([blob], name, { type: 'text/plain' });
        if(navigator.canShare(file)) {
            navigator.share({
                files: [file]
            });
        }
}

export {
    downloadTxt,
    shareTxt
}