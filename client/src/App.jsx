import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrenPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const getData = async () => {
    setIsLoading(true);
    await fetch(`http://localhost:8000/api/v1/category/702-ordinateur-portable?page=${currentPage}`)
      .then((res) => res.json())
      .then((newData) => {
        //console.log(newData);
        if (totalPages == null) {
          setTotalPages(newData.pages);
        }
        setData([...data, ...newData.data]);
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    //console.log(currentPage)
    getData();
  }, [currentPage]);

  if (isError)
    return <h3 className="text-center font-semibold text-3xl p-2">Error!!</h3>;
  return (
    <>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-auto py-3">{data ? (
        data.map((item, i) => (
          <div key={i} className="p-2 border-2 border-black rounded-md">
            <span className="bg-red-500 text-white rounded-full p-2">{i+1}</span>
            <h3 className="font-semibold text-xl p-2">{item.product_name}</h3>
            <p className="p-2">Price: {item.price}</p>
            <img src={item.product_image} alt={item.product_reference} /><span>{item.product_reference}</span>
          </div>
        ))
      ) : (
        <h3>Somthing is wrong in data!</h3>
      )}</div>
      {isLoading && (
        <h3 className="text-center font-semibold text-3xl">Loading...</h3>
      )}
      {currentPage < totalPages && (
        <div className="grid place-items-center p-4">
          <button 
            onClick={() => setCurrenPage(currentPage + 1)}
            className="bg-red-500 text-white font-semibold text-2xl p-2">
            More Data
          </button>
        </div>
      )}
    </>
  );
};

export default App;
