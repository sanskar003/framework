export const getAssemblyByParentBarcode = async (parentBarcode: string) => {
    try {
        const response = await fetch(
            `https://congenial-lamp-g4r7p5xvwg5x2v6w5-5000.app.github.dev/api/assembly/${parentBarcode}`
        )
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message)
        };
        const data = await response.json()
        return data;

    } catch (error) {
        console.log("Error :", error);
        throw error;
    }
}


export const addPartToAssembly = async (parentBarcode: string, childBarcode: string) => {
    try {
        const response = await fetch(
            `https://congenial-lamp-g4r7p5xvwg5x2v6w5-5000.app.github.dev/api/assembly/${parentBarcode}/parts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ childBarcode })
        }
        )

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message)
        };
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error :", error)
        throw error;
    }
}


export const getProductByProductCode = async (productCode: string) => {
    try {
        const response = await fetch(
            `https://congenial-lamp-g4r7p5xvwg5x2v6w5-5000.app.github.dev/api/product/${productCode}`
        )

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message)
        }
        const data = await response.json()
        return data;

    } catch (error) {
        console.log("Error :", error)
        throw error;
    }
}

export const uploadProductImage = async (
    productCode: string,
    imageType: string,
    image: File
) => {
    try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("imageType", imageType);
        
        const response = await fetch(
            `https://congenial-lamp-g4r7p5xvwg5x2v6w5-5000.app.github.dev/api/product/${productCode}/image`, {
            method: "POST",
            body: formData
        }

        )
        if (!response.ok) {
            throw new Error("Failed to upload image");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log("Error :", error)
        throw error;
    }
}