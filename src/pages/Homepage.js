import SearchBox from "../components/SearchBox";

const Homepage = () => {
    return (
        <div className='flex flex-col my-16 items-center h-screen'>
            <div className='text-center p-2'>
                <h1 className=' text-4xl sm:text-5xl font-bold'>Search Functionality</h1>
                <h3 className="sm:text-2xl my-4 font-semibold">I am using Youtube API, So you can search videos</h3>
                <SearchBox />
            </div>
        </div>
    );
}

export default Homepage;