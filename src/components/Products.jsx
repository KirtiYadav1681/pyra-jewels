import axios from "axios"
import Product from "./Product"
import styled from "styled-components"
import {useState,useEffect}  from "react"

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
`;

const Products = ({ cat,filters,sort }) => {
  const [products,setProducts] =  useState([]);
  const [filteredProducts,setFilteredProducts] = useState([]);

  useEffect(() =>{
      const getProducts = async () =>{
        try{  
          const res = await axios.get(cat ? `http://localhost:8000/api/product/find/limit?cate=${cat}`: `http://localhost:8000/api/product/find/limit/`);
          setProducts(res.data);
        }catch(e){console.log(e)}
      };
      getProducts();
  },[cat])
  
  useEffect(()=>{
    cat && 
    setFilteredProducts(
      products.filter((item) => 
        Object.entries(filters).every(([key,value]) =>
          item[key].includes(value)
          )
        )
      );
  },[products,cat,filters])

  useEffect(()=>{
    if(sort === "newest"){
      setFilteredProducts((prev) => 
      [...prev].sort((a,b)=> a.createdAt - b.createdAt));
    } else if(sort === "asc"){
      setFilteredProducts((prev) => 
      [...prev].sort((a,b)=> a.price - b.price));
    }else{
      setFilteredProducts((prev) => 
      [...prev].sort((a,b)=> b.price - a.price));
    }
  },[sort])

  return (
    <Container>
      {cat 
      ? filteredProducts.map((item) => <Product item={item} key={item.id} />) 
      : products.slice(0,8).map((item) => <Product item={item} key={item.id} />)
      }
    </Container>
  );
};

export default Products;
