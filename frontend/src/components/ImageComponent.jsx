import { useState } from "react"
export function ImageComponent() {

    const image = ['https://img-c.udemycdn.com/notices/web_carousel_slide/image/e6cc1a30-2dec-4dc5-b0f2-c5b656909d5b.jpg', 'https://img-c.udemycdn.com/notices/web_carousel_slide/image/10ca89f6-811b-400e-983b-32c5cd76725a.jpg']

    const handleLeftClick = () => {
        setCurrentImage((currentImage - 1 + image.length) % image.length);
    };

    const handleRightClick = () => {
        setCurrentImage((currentImage + 1) % image.length);
    };

    const [currentImage, setCurrentImage] = useState(0)

    return <div className="flex justify-center w-screen items-center">
        <button
            aria-label="Previous image"
            className="mr-5 bg-gray-900 p-2 rounded-full transform -translate-y-1/2 right-4 focus:outline-none hover:bg-gray-800 "
            onClick={handleLeftClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-white"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                />
            </svg>
        </button>
        <div className="bg-blue-200w-11/12">
            <img className="w-full h-full object-cover" src={image[currentImage]} alt=""></img>
        </div>

        <button
            aria-label="Next image"
            className="ml-5 bg-gray-900 p-2 rounded-full transform -translate-y-1/2 right-4 focus:outline-none hover:bg-gray-800"
            onClick={handleRightClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6 text-white"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                />
            </svg>
        </button>
    </div>
}