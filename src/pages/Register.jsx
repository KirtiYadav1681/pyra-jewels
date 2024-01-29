import styled from "styled-components"
import {mobile} from "../responsive";
import {useState} from "react";
import { register } from "../redux/apiCalls";
import {useDispatch} from "react-redux";

const Container = styled.div`
 width:100vw;
 height:100vh;
 background:linear-gradient(
   rgba(255,255,255,0.5),
   rgba(255,255,255,0.5)
 ),
 url("https://t4.ftcdn.net/jpg/02/06/72/27/360_F_206722744_QuxNCwqNo6Zpn8Xx75dYx2gDb37eI2lY.jpg" )center;
 background-size:cover;
 display:flex;
 align-items:center;
 justify-content:center;
`;

const Wrapper = styled.div`
 width:40%;
 padding:20px;
 background-color:white;
 ${mobile({width:"75%"})}
`;

const Title = styled.h1`
 font-size:24px;
 font-weight:300;
`;

const Form = styled.form`
 display:flex;
 flex-wrap:wrap;
`;

const Input = styled.input`
 flex:1;
 min-width:40%;
 margin:20px 10px 0px 0px;
 padding:10px;
`;

const Agreement = styled.span`
 font-size:12px;
 margin:20px 0px;
`;

const Button = styled.button`
 width:40%;
 border:none;
 padding:15px 100px;
 background-color:teal;
 color:white;
 cursor:pointer;
 border:1px solid green;
`;

const Error = styled.span`
color:red;
`

const Register = () => {
  const [name,setName] = useState("");
  const [lastName,setLastName] = useState("");
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirm,setConfirm] = useState("");
  const dispatch = useDispatch();
  const [error,setError] = useState("");


  const handleClick = async (e) =>{ 
    e.preventDefault();
    if(!name || !lastName || !username || !email || !password || !confirm){
      alert("All fields are necessary");
      setError("All fields are necessary");
    }else if(password !== confirm){ 
      alert("Password and confirm password doesn't match");
      setError("Password and confirm password doesn't match")
    }else {
        const res = await register(dispatch,{username,password,email})
        if (res === undefined) setError("Something went wrong or the user already exists")
    }    
  }

  return (
    <Container>
        <Wrapper>
            <Title>CREATE AN ACCOUNT</Title>    
            <Form>
                <Input placeholder="name" type="text" onChange={(e)=>{setName(e.target.value)}}/>
                <Input placeholder="last name" type="text" onChange={(e)=>{setLastName(e.target.value)}}/>
                <Input placeholder="username" type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
                <Input placeholder="email" type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                <Input placeholder="password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <Input placeholder="confirm password" type="password" onChange={(e)=>{setConfirm(e.target.value)}}/>
                <Agreement>
                    By creating an account,I consent to the processing of my personal
                    data in accordance with the <b>PRIVACY POLICY</b>
                    <br />
                    { !error && <Error><b>{error}</b></Error>}
                </Agreement>  
                <Button onClick={handleClick}>CREATE</Button> 
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Register