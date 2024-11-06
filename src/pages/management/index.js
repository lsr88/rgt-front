import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { styled } from '@mui/material/styles';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import axios from 'axios';



const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '90%',
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



function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(date, orderId, menu, price, quantity, processing) {
  let process = processing === 0 ? "접수 중..." 
                : processing === 1 ? "조리 중..." 
                : processing === 2 ? "조리 완료" 
                : processing === 3 ? "주문 취소" : "에러"
  return {
    date,
    orderId,
    menu,
    price,
    quantity,
    process,
    processing
  };
}

const putdata = async (num, url) => {
  console.log("업데이트 시작")
  try {
    await axios.put(`${url}${num}`, num);
    console.log(`${url}`)
  } catch (error) {
    console.log(error)
  }
}

const updateOrder = (num) => {
  console.log(num)
  let url = "http://localhost:8000/api/admin/updateOrder/"
  putdata(num, url)
}

const cancelOrder = (num) => {
  console.log(num)
  let url = "http://localhost:8000/api/admin/cancelOrder/"
  putdata(num, url)
}


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          {row.processing < 2 ? (<IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>) : <></>}
        </TableCell>
        <TableCell >{row.date}</TableCell>
        <TableCell align="right">{row.orderId}</TableCell>
        <TableCell align="right">{row.menu}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.process}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
          {row.processing === 0 ? (
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                주문 상태 관리
              </Typography>
                <Box sx={{ margin: 1 }} justifyContent={"flex-end"}>
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" size="large" onClick={()=>updateOrder(row.orderId)}>주문 받기</Button>
                    <Button variant="contained" size="large" onClick={()=>cancelOrder(row.orderId)}>주문 취소</Button>
                  </Stack>
                  </Box>
              </Box>) : row.processing === 1 ? (
                <Box sx={{ margin: 1 }}>
                  <Typography variant="h6" gutterBottom component="div">
                      주문 상태 관리
                  </Typography>
                <Box sx={{ margin: 1 }} justifyContent={"flex-end"}>
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" size="large" onClick={()=>updateOrder(row.orderId)}>완료</Button>
                    <Button variant="contained" size="large" onClick={()=>cancelOrder(row.orderId)}>주문 취소</Button>
                  </Stack>
                </Box>
              </Box>) : <></>}
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function ManagementPage() {
  const [ws, setWs] = React.useState(null);
  const [list, setList] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  const getdata = async () => {
    try {
      const response = await axios.get("http://localhost:8000/test/search_test");
      console.log(response.data)
      setList(response.data);
    } catch (error) {
      console.log(error)
      // alert('조회 에러');
    }
  }

  const connectWebSocket = () => {
    const socket = new WebSocket('ws://localhost:8000/ws');  // FastAPI WebSocket 서버
    setWs(socket);

    socket.onopen = () => {
      console.log('Connected to WebSocket');
      socket.send('Hello from Next.js client!');
    };

    socket.onmessage = (event) => {
      const message = event.data;
      console.log('Received message:', message);
      if (message.startsWith('[')) {
        let getdata = JSON.parse(message)
        setList(getdata);  // 문자열을 상태에 저장
      } else {
        console.log('Received data is not a JSON array');
      }
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket');
    };
  };

  React.useEffect(() => {
    getdata()
    connectWebSocket()
  }, [])

  React.useEffect(() => {
    setOrderList()
  }, [list])

  const setOrderList = () => {
    if (list.length !== 0) {
      let orders = []
      for (const order of list){
        let line = createData(order.date, order.orderId, order.menu, order.price, order.quantity, order.processing)
        orders.push(line)        
      }
      let sortOrders = orders.sort((a, b) => b.orderId - a.orderId);
      setRows(sortOrders)
    }
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
    <SignInContainer direction="column" justifyContent="space-between">
      <h1>주문 현황 대시보드</h1>
        <Card variant="outlined">
          <h2>주문 테이블</h2>
          <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Order Time</TableCell>
                  <TableCell align="right">OrderID</TableCell>
                  <TableCell align="right">menu</TableCell>
                  <TableCell align="right">price</TableCell>
                  <TableCell align="right">수량</TableCell>
                  <TableCell align="right">주문 상태</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                  ).map((row) => (
                  <Row key={row.name} row={row} />
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
          <Box align="right" >
            <Button variant="contained" href="/" size="large" width="300px">메인 페이지로</Button>
          </Box>
        </Card>
      </SignInContainer>
    </>
  );
}
