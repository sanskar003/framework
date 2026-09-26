import React, { useState } from "react";
import { uploadProductImage } from "../services/api";
import { Link } from "react-router-dom";

const imageTypes = [
    "MAIN_FRAME",
    "BUTTON_LAYER",
    "CIRCUIT_BOARD",
    "FRONT_LED",
    "BATTERY_COMPARTMENT",
];

export default function ProductImageUpload() {
    const [selectedImages, setSelectedImages] = useState<Record<string, File | null>>({});
    const [imagePreview, setImagePreview] = useState<Record<string, string | null>>({});

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>, imageType: string) => {
        const file = event.target.files?.[0];

        if (file) {
            setSelectedImages((prev) => ({ ...prev, [imageType]: file }))
            setImagePreview((prev) => ({ ...prev, [imageType]: URL.createObjectURL(file) }))
        }
    }
    // console.log("selected:", selectedImage, "imagepreview:",imagePreview)

    const handleupload = () => {
        // const selectedImage = selectedImages[imageType];

        // if (!selectedImage) return;

        // console.log("Selected image before upload:", selectedImage);

        // try {
        //     const response = await uploadProductImage(
        //         "REMOTE-CONTROL-V1",
        //         imageType,
        //         selectedImage
        //     );

        //     console.log(response);
        // } catch (error) {
        //     console.log("Error :", error);
        // }
    }


    return (
        <section className="min-h-full bg-slate-50 p-6">

            {/* Page Header */}
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Product Images
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Upload and manage images used for assembly tracking.
                    </p>
                </div>

                <Link to="/"
                    className="rounded-xl bg-blue-300 px-2 py-1">
                    Home
                </Link>
            </div>

            {/* Product Information */}
            <div className="mb-6 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Product
                </p>

                <h2 className="mt-1 text-lg font-semibold text-slate-800">
                    REMOTE-CONTROL-V1
                </h2>
            </div>

            {/* Image Upload Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:gride-cols-4 lg:grid-cols-4 gap-5 ">

                {imageTypes.map((imageType) => (
                    <div
                        key={imageType}
                        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                    >

                        {/* Card Header */}
                        <div className="mb-4 flex items-center justify-between">
                            <div>
                                <h2 className="text-sm font-semibold text-slate-800">
                                    {imageType.replaceAll("_", " ")}
                                </h2>

                                {/* <p className="mt-1 text-xs text-slate-400">
                                    Product reference image
                                </p> */}
                            </div>

                            <span className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-500">
                                {imageType}
                            </span>
                        </div>

                        {/* Image Preview */}
                        <div className="mb-4 flex h-44 items-center justify-center overflow-hidden rounded-md border border-dashed border-slate-300 bg-slate-50">
                            {imagePreview[imageType] ? (
                                <img
                                    className="h-full w-full object-contain"
                                    src={imagePreview[imageType]}
                                    alt={imageType}
                                />
                            ) : (
                                <div className="text-center">
                                    <p className="text-sm font-medium text-slate-400">
                                        No image selected
                                    </p>

                                    <p className="mt-1 text-xs text-slate-400">
                                        Upload a product reference image
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Upload Controls */}
                        <div className="flex items-center gap-3">

                            <label className="flex-1 cursor-pointer rounded-md border border-slate-300 bg-white px-3 py-2 text-center text-sm font-medium text-slate-600 transition hover:bg-slate-50">
                                Choose Image

                                <input
                                    className="hidden"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) =>
                                        handleImage(event, imageType)
                                    }
                                />
                            </label>

                            {/* <button
                                className="rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={() => handleupload(imageType)}
                                disabled={!selectedImages[imageType]}
                            >
                                Upload
                            </button> */}

                        </div>

                                
                    </div>
                ))}
                <button
                                className="rounded-md w-32 h-20 bg-slate-800 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40"
                                onClick={handleupload}
                                // disabled={!selectedImages[imageType]}
                            >
                                Upload
                            </button>
                 
            </div>

        </section>
    );
}