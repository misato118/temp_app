const ApplicationFilter = () => {
    return (
        <div className="flex justify-center mt-8 mr-8">
            <input className="mx-2 input input-bordered rounded-full w-[30ch] max-w-full" placeholder="Search by item ID or name" />
            <button className="py-1 ml-2 btn rounded-full font-normal">Search</button>
        </div>
    );
}

export default ApplicationFilter;