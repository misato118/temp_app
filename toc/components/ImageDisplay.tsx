const ImageDisplay = () => {
    return (
        <div className="grid grid-cols-3 gap-4 p-10 scale-75">
            <div className="col-span-3 flex justify-center"><img src="/sampleImg.png" alt="Item Image"></img></div>
            <div><img src="/sampleImg.png" alt="Item Image"></img></div>
            <div><img src="/sampleImg.png" alt="Item Image"></img></div>
            <div><img src="/sampleImg.png" alt="Item Image"></img></div>
        </div>
    );
}

export default ImageDisplay;