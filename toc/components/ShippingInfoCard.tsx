const ShippingInfoCard = () => {
    return (
        <div className="card mt-5 bg-base-100 shadow-xl w-2/5 h-auto max-h-fit w-auto max-w-fit">
            <div className="card-body p-5">
                <h2 className="card-title mb-2">Shipping Address</h2>
                <div className="grid grid-cols-2 gap-2">
                    <p className="font-bold">Primary Address</p>
                    <p>ADDRESS HERE</p>
                    <div className="divider mt-0 col-span-2"></div>
                </div>
            </div>
        </div>        
    );
}

export default ShippingInfoCard;