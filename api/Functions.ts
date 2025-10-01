export function downloadFile(fileURL: string, name: string) {
    console.log(fileURL)
    fetch(fileURL, { mode: "cors" })
        .then((res) => res.blob())
        .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = name;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(link.href);
        })
        .catch(console.error);
}
