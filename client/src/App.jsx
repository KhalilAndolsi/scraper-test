import React, { useEffect, useState } from "react";

const App = () => {
  const [url, setUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentPage, setCurrenPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  const getCategories = async () => {
    setIsLoading(true);
    await fetch(`http://localhost:8000/api/v1/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const getData = async () => {
    setIsLoading(true);
    await fetch(`http://localhost:8000${url}?page=${currentPage}`)
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
    getCategories();
  }, []);

  useEffect(() => {
    if (url) {
      getData();
    }
  }, [currentPage, url]);

  if (isError)
    return <h3 className="text-center font-semibold text-3xl p-2">Error!!</h3>;
  return (
    <>
      <div className="flex gap-3 flex-wrap justify-center p-2">
        {categories &&
          categories.map((item, i) => (
            <h3
              key={i}
              className={`inline p-2 rounded-md ${
                item.url === url
                  ? "bg-white text-blue-500"
                  : "bg-blue-500 text-white"
              }  font-semibold cursor-pointer border-2 border-blue-500`}
              onClick={() => {
                setUrl(item.url);
                setData([]);
                setTotalPages(null);
                setCurrenPage(1);
              }}>
              {item.category}
            </h3>
          ))}
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mx-auto py-3">
        {data ? (
          data.map((item, i) => (
            <div key={i} className="p-2 border-2 border-black rounded-md">
              <span className="bg-red-500 text-white rounded-full p-2">
                {i + 1}
              </span>
              <h3 className="font-semibold text-xl p-2">{item.product_name}</h3>
              <p className="p-2">Price: {item.price}</p>
              <img src={item.product_image} alt={item.product_reference} />
              <span>{item.product_reference}</span>
            </div>
          ))
        ) : (
          <h3>Somthing is wrong in data!</h3>
        )}
      </div>
      {isLoading && (
        <h3 className="text-center font-semibold text-3xl">Loading...</h3>
      )}
      {currentPage < +totalPages && (
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
