"use client"

import { CldUploadWidget } from "next-cloudinary"
import Image from "next/image"
import { useCallback } from "react"
import { ImagePlus, Trash } from "lucide-react"

interface ImageUploadProps {
    onChange: (value: string) => void
    value: string
    disabled?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    onChange,
    value,
    disabled,
}) => {
    const handleUpload = useCallback(
        (result: any) => {
            onChange(result.info.secure_url)
        },
        [onChange]
    )

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value && value.startsWith("http") && (
                    <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md">
                        <div className="absolute right-2 top-2 z-10">
                            <button
                                type="button"
                                onClick={() => onChange("")}
                                className="rounded-md bg-red-600 p-1 text-white shadow-sm hover:bg-red-700"
                            >
                                <Trash size={16} />
                            </button>
                        </div>
                        <Image
                            fill
                            className="object-cover"
                            alt="Image"
                            src={value}
                        />
                    </div>
                )}
            </div>
            <CldUploadWidget
                onSuccess={handleUpload}
                uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                options={{
                    maxFiles: 1
                }}
            >
                {({ open }) => {
                    return (
                        <button
                            type="button"
                            disabled={disabled}
                            onClick={() => open()}
                            className="flex items-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            <ImagePlus size={20} />
                            Upload an Image
                        </button>
                    )
                }}
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload
