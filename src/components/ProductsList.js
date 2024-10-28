import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import SearchBar from './SearchBar';

const ProductsList = ({ onSelectProduct }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const productsPerPage = 10; 

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setFilteredProducts(json);
      });
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(0); 
  };

  useEffect(() => {
    const results = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchTerm, products]);

  if (products.length === 0) return <p>Loading...</p>;

  const offset = currentPage * productsPerPage;
  const currentProducts = filteredProducts.slice(offset, offset + productsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="App-products-container">
      <SearchBar searchTerm={searchTerm} handleSearch={handleSearch} />

      <div className="App-products">
        {currentProducts.map(product => (
          <div
            key={product.id}
            className="product"
            onClick={() => onSelectProduct(product.id)}
          >
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
          </div>
        ))}
      </div>

      {filteredProducts.length > productsPerPage && (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={Math.ceil(filteredProducts.length / productsPerPage)}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default ProductsList;
