import { useState } from "react";
import "./App.css";

import Filters from "./components/Filters";
import Header from "./components/Header";
import ProductList from "./components/ProductList/ProductList";
import ProductState from "./components/ProductState";
import Cart from "./components/Cart/Cart";

import useFetch from "./hooks/useFetch";
import useFilters from "./hooks/useFilters";
import useDebounce from "./hooks/useDebounce";

const API = {
  PRODUCTS_PAGINATED: "https://dummyjson.com/products?limit=12&skip=0",
  CATEGORIES: "https://dummyjson.com/products/category-list",
  PRODUCTS_BY_CATEGORY: "https://dummyjson.com/products/category/",
};

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { search, selectedCategory, onSearchChange, onCategoryChange } =
    useFilters();

  const debouncedSearch = useDebounce(search);

  const productsUrl = selectedCategory
    ? `${API.PRODUCTS_BY_CATEGORY}${selectedCategory}`
    : API.PRODUCTS_PAGINATED;

  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
    refetch,
  } = useFetch(productsUrl);

  const { data: categoriesData } = useFetch(API.CATEGORIES);
  const categories = categoriesData ?? [];

  const products = (productsData?.products ?? []).filter((product) =>
    product.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  const handleCartToggle = () => {
    setIsCartOpen((prev) => !prev);
  };

  return (
    <div className="wrapper">
      <Header onCartClick={handleCartToggle} />
      {isCartOpen && <Cart onClose={() => setIsCartOpen(false)} />}
      <Filters
        search={search}
        onSearchChange={onSearchChange}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={onCategoryChange}
      />

      <ProductState
        isLoading={productsLoading}
        error={productsError}
        isEmpty={!productsLoading && !productsError && products.length === 0}
        onRetry={refetch}
      />

      {!productsLoading && !productsError && products.length > 0 && (
        <ProductList products={products} />
      )}
    </div>
  );
};

export default App;
