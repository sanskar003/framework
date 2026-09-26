export const getPartByBarcode = async (barcode: string) => {
    const response = await fetch(
        `https://congenial-lamp-g4r7p5xvwg5x2v6w5-5000.app.github.dev/part/${barcode}`
    );
    if(!response) throw new Error("Failed to fetch part")
    const data = await response.json()
    return data.data;
}