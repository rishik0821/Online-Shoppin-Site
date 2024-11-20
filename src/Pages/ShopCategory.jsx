import React, { useContext, useState } from "react";
import "./Css/Shopcategory.css";
import { Shopcontext } from "../context/Shopcontext";
import Item1 from "../Components/Items1/Item1";
import { FaSearch } from "react-icons/fa"; // You can import the search icon from react-icons

const ShopCategory = (props) => {
  const { all_product } = useContext(Shopcontext);
  const [sortOption, setSortOption] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Handle search input change
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Sort products based on the selected option
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  // Filter and sort the products
  const filteredAndSortedProducts = [...all_product]
    .filter((item) => 
      item.category === props.Category && 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by search query
    )
    .sort((a, b) => {
      if (sortOption === "low-to-high") {
        return a.new_price - b.new_price;
      } else if (sortOption === "high-to-low") {
        return b.new_price - a.new_price;
      } else {
        return 0;
      }
    });

  return (
    <div className="shopcategory">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexsort">
        <p>
          <span>Showing 1-12 </span>out of {filteredAndSortedProducts.length} products
        </p>
        <div className="shopcategory-sort">
          <label htmlFor="sort">Sort by: </label>
          <select id="sort" value={sortOption} onChange={handleSortChange} className="sort-dropdown">
            <option value="">None</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
          </select>
        </div>
      </div>

      {/* Search Input with Icon */}
      <div className="shopcategory-search"> 
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={handleSearch} // Handle search query change
          className="search-input"
        />
        {/* Search icon inside the input */}
        <FaSearch className="search-icon" />
      </div>

      <div className="shopcategory-products">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((item, i) => (
            <Item1
              key={i}
              id={item.id}
              name={item.name}
              img={item.image}
              oldprice={item.old_price}
              newprice={item.new_price}
            />
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ShopCategory;
