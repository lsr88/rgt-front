import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Select from '@mui/material/Select';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab'
import axios from 'axios';

import QuantityInput from '../../component/QuantityInput'

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: '600px',
    },
    boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
      boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
  }));

  const SignInContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(4),
    },
    '&::before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      zIndex: -1,
      inset: 0,
      backgroundImage:
        'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
      backgroundRepeat: 'no-repeat',
      ...theme.applyStyles('dark', {
        backgroundImage:
          'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
      }),
    },
  }));

export default function OrderPage() {
    const [ws, setWs] = React.useState(null);
    const [price, setPrice] = React.useState(0);
    const [menu, setMenu] = React.useState("");
    const [quantity, setQuantity] = React.useState(1);
    const [loading, setLoading] = React.useState(false);

    const connectWebSocket = () => {
      const socket = new WebSocket('ws://localhost:8000/ws');  // FastAPI WebSocket 서버
      setWs(socket);
  
      socket.onopen = () => {
        console.log('Connected to WebSocket');
        socket.send('Hello from Next.js client!');
      };
  
      socket.onmessage = (event) => {
        console.log('Received:', event.data);
      };
  
      socket.onclose = () => {
        console.log('Disconnected from WebSocket');
      };
    };

    React.useEffect(() => {
      connectWebSocket()
    }, [])


    const handleMenuChange = (event) => {
        setPrice(event.target.value);
        setMenu(event.target.value === 5000 ? "김밥" : event.target.value === 6000 ? "라면" : event.target.value === 7000 ? "우동" : "")
      };

    const handleClickCounter = (num) => {
        setQuantity((prev) => prev + num);
    };

    const handleOrder = async () => {
        try {
          let orderData = {
            menu : menu,
            price : price*quantity,
            quantity : quantity,
          }
          alert(`메뉴 ${menu}의 가격은 ${price}, 총 가격은${price*quantity} 입니다 주문하시겠습니까? `)
          setLoading(true)
          const response = await axios.post("http://localhost:8000/api/client/order", orderData);
          if(response.status === 200){
            alert(`감사합니다. 주문이 접수되었습니다.`)
            if(ws){
              const message = "order"
              ws.send(message)
            } else {
              console.log('WebSocket is not connected.');
            }
          }
          setLoading(false)
        } catch (error) {
          alert("죄송합니다. 주문이 접수되지 않았습니다. 다시 시도하여 주세요")
          setLoading(false)
        }
      };

  return (
    <>
        <SignInContainer>
            <Card>
                <h1>주문을 위한 page입니다.</h1>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={price}
                    label="order"
                    onChange={handleMenuChange}
                >
                    <MenuItem value={0}>없음</MenuItem>
                    <MenuItem value={5000}>김밥</MenuItem>
                    <MenuItem value={6000}>라면</MenuItem>
                    <MenuItem value={7000}>우동</MenuItem>
                </Select>
                <QuantityInput
                  quantity={quantity}
                  onClick={handleClickCounter}
                  stock={99}
                />
                <h5>가격은 : {price*quantity} 원입니다.</h5>
                <Button variant="contained" size="large" disabled={price === 0 ? true : false} onClick={handleOrder}>주문하기</Button>
                <Button variant="contained" href="/" size="large">돌아가기</Button>
            </Card>
        </SignInContainer>
    </>
  );
}
