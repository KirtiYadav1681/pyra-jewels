// import React,{useState,useEffect} from 'react'
import {useSelector} from "react-redux"
import { mobile } from '../responsive'
import styled from "styled-components"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { Add ,Remove } from "@material-ui/icons"
import Announcement from "../components/Announcement"
// const axios = require('axios');



const Container = styled.div``;
const ProductName = styled.span``;
const ProductId = styled.span``;
// const ProductSize = styled.span``;
const SummaryItemText = styled.span``;
const SummaryItemPrice = styled.span``;

const Wrapper = styled.div`
  padding:20px;
  ${mobile({padding:"10px"})}
`;

const Title =styled.h1`
 font-weight:300;
 text-align:center;
`;

const Top = styled.div`
 display:flex;
 align-items:center;
 justify-content:space-between;
 padding:20px;
`;

const TopButton = styled.button`
 padding:10px;
 font-weight:600;
 cursor:pointer;
 border:${(props) => props.type === "filled" && "none"};
 background-color:${(props) => props.type === "filled" ? "black" : "transparent"};
 color:${(props => props.type === "filled" && "white")};
`;

const TopTexts =styled.div`
 ${mobile({display:"none"})}
`;

const TopText = styled.span`
 text-decoration:underline;
 cursor:pointer;
 margin:0px 10px;
`;

const Bottom = styled.div`
 display:flex;
 justify-content:space-between;
${mobile({flexDirection:"column"})}
`;

const Info = styled.div`
 flex:3;
`;

const Product = styled.div`
 display:flex;
 justify-content:space-between;
 ${mobile({flexDirection:"column"})}
`;

const ProductDetail = styled.div`
 flex:2;
 display:flex;
`;

const Image = styled.img`
 width:200px;
`;

const Details = styled.div`
 padding:20px;
 display:flex;
 flex-direction:column;
 justify-content:space-around
`;

const ProductColor = styled.div`
 width:20px;
 height:20px;
 border-radius:50%;
 background-color:${(props) => props.color};
`;

const PriceDetail = styled.div`
 flex:1;
 display:flex;
 flex-direction:column;
 align-items:center;
 justify-content:center;
`;

const ProductAmountContainer = styled.div`
 display:flex;
 align-items:center;
 margin-bottom:20px;
`;

const ProductAmount = styled.div`
 font-size:24px;
 margin:5px;
 ${mobile({margin:"5px 15px"})}
`;

const ProductPrice = styled.div`
 font-size:30px;
 font-weight:200;
 ${mobile({marginBottom:"20px"})}
`;

const Hr = styled.div`
 background-color:#eee;
 border:none;
 height:1px;
 width:95%
`;

const Summary = styled.div`
 flex:1;
 border:0.5px solid lightgray;
 border-radius:10px;
 padding:20px;
 height:50vh;
`;

const SummaryTitle = styled.h1`
 font-weight:200;
`;

const SummaryItem = styled.div`
 margin:30px 0px;
 display:flex;
 justify-content:space-between;
 font-weight:${(props) => props.type === "total" && "500" };
 font-size:${(props) => props.type === "total" && "24px"};
`;

const Button = styled.button`
 width:100%;
 padding:10px;
 background-color:black;
 color:white;
 font-weight:600;
`;


const Cart = () => {
  const cart = useSelector(state=>state.cart)
  // const userId= useSelector(state=>state.user.currentUser._id);
  const quantity = useSelector(state=>state.cart.quantity);

  // var config = {
  //   method: 'get',
  //   url: `http://localhost:8000/api/cart/find/${userId}`,
  //   headers: { 
  //     'token': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZjBlZTE1MDZjNjdkYWNhZmFjNTIxMiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2MTI1NzIyNH0.yiIZ54RHAu6tQbLofARzPL9JKVxTZUk64dFHaV0DLRo'
  //   }
  // };
  
  // axios(config)
  // .then(function (response) {
  //   console.log(response.data)
  //   response.data.map((product)=>{
  //     let id = product.products[0].productId;
  //     let quantity = product.products[0].quantity;
  //     console.log({id, quantity})
  //   })
  //   })
  // .catch(function (error) {
  //   console.log(error);
  // });

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton>CONTINUE SHOPPING</TopButton>
          <TopTexts>
            <TopText>Shopping Bag({quantity})</TopText>
          </TopTexts>
          <TopButton type="filled">CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products.map((product) =>(
              <div key={product._id}>
              <Product >
                <ProductDetail>
                  <Image src={product.image}/>
                  <Details>
                    <ProductName><b>Product:</b> {product.title}</ProductName>
                    <ProductId><b>ID:</b> {product._id}</ProductId>
                    <ProductColor color={product.color}/>
                    {/* <ProductSize><b>Size:</b>{product.size}</ProductSize> */}
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove />
                  </ProductAmountContainer>
                  <ProductPrice>Rs. {product.price*product.quantity}</ProductPrice>
                </PriceDetail>
              </Product>
              <Hr/>
              </div>
            ))}
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>Rs. 43</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>Rs.- 43</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>Rs. {cart.total} </SummaryItemPrice>
            </SummaryItem>
            <Button>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Cart