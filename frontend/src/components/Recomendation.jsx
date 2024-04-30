export function Recomendation() {
  return <div className='w-screen px-16 py-4 '>
        <h1 className="font-bold text-2xl">Topics recommended for you</h1>
        <div className="w-full mt-8">
            <div className="justify-center grid grid-cols-5 gap-2">
                <Tab title={'Data Science'}></Tab>
                <Tab title={'Machine Learning'}></Tab>
                <Tab title={'Web Scraping'}></Tab>
                <Tab title={'Deep Learning'}></Tab>
                <Tab title={'Data Analysis'}></Tab>
            </div>
            <div className="justify-center mt-3 grid grid-cols-5 gap-2">
                <Tab title={'Python'}></Tab>
                <Tab title={'Flask'}></Tab>
                <Tab title={'Programming'}></Tab>
                <Tab title={'Django'}></Tab>
                <Tab title={'Web Dev'}></Tab>
            </div>
        </div>

    </div>
}

function Tab({ title }) {
  return (
    <div className="border border-gray-300 py-4 px-16 text-center hover:bg-gray-100">
      <h1 className="font-bold text-md">{title}</h1>
    </div>
  );
}
