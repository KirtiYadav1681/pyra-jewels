import styled from "styled-components"
import axios from "axios";
import { mobile } from "../responsive"
import {useDispatch,useSelector} from "react-redux"
import {useEffect, useState} from "react"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import {useLocation} from "react-router-dom"
import {addProduct} from "../redux/cartRedux"
import TabPanel from "../components/TabPanel"
// import {publicRequest}  from "../requestMethod"
import { Add, Remove } from "@material-ui/icons"
import Newsletter from "../components/Newsletter"
import Announcement from "../components/Announcement"

const Container = styled.div``;
const FilterSizeOption = styled.option``;


const Wrapper = styled.div`
 padding:50px;
 display:flex;
 ${mobile({padding:"10px",flexDirection:"column"})}
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  ${mobile({padding:"10px"})}
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({width:"100%"})}

`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  font-weight: 500;

  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {

  const [quantity,setQuantity] = useState(1);
  const [product,setProduct] = useState({});
  const [color,setColor] =  useState("");
  const [size,setSize] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();

  const id = location.pathname.split('/')[2];
  const token = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.acessToken;
  const userId = useSelector(state=>state.user.currentUser._id);

  const BASE_URL = "http://localhost:8000/api";
  const publicRequest = axios.create({
    baseUrl: BASE_URL
  })

  // GET PRODUCT DETAILS
  useEffect(()=>{
    const getProduct = async () =>{
      try{
        const res = await publicRequest.get(`http://localhost:8000/api/product/get/${id}`); 
        setProduct(res.data);
      }catch(e){console.log(e)}
    }
    getProduct();
  },[id,publicRequest])

  const handleQuantity =  async (type) => {
    if(type === "dec"){ quantity>1 && setQuantity(quantity-1); }
    else {setQuantity(quantity+1)}
  }

  var data = JSON.stringify({
    "userId": userId,
    "products": [
      {
        "productId": id,
        "quantity":quantity
      }
    ]
  });

  var config = {
    method: 'post',
    url: 'http://localhost:8000/api/cart/add',
    headers: { 
      'token': `bearer ${token}`, 
      'Content-Type': 'application/json'
    },
    data : data
  };

  // POST PRODUCT TO CART 
  const addToCart = () =>{
    axios(config)
      .then(function (response) {
        dispatch(addProduct({...product,quantity,color,size}))
          console.log(JSON.stringify(response.data));
        })
      .catch(function (error) {
        console.log(error);
      });
  }
   
 return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer><Image src={product.image} /></ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>Rs.{product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
            {/* after successfull backend  */}
            {/* {product.color?.map((c) => <FilterColor color={c} key={c} onClick={()=>setColor(c)}/>)} */}
              <FilterColor color="black"/>
              <FilterColor color="blue"/>
              <FilterColor color="gray"/>
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
            <FilterSize onChange={(e) => setSize(e.target.value)}>
            {/* after successfull backend  */}
            {/* {product.size?.map((s) => <FilterSizeOption key={s}>{s}</FilterSizeOption>)} */}
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={()=>handleQuantity("dec")}/>
              <Amount>{quantity}</Amount>
              <Add onClick={()=>handleQuantity("inc")}/>
            </AmountContainer>
            <Button onClick={addToCart}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <TabPanel/>
      <Newsletter/>
      <Footer/>
    </Container>
  );
};

export default Product;
