import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { Box } from '@mui/material';
import { DisplaySettings } from '@mui/icons-material';

export default function QuantityInput({ stock, quantity, onClick }) {
    return (
        <Box sx={{display:"flex", justifyContent:"space-between"}}>
            <Box>
           <label>
            <span className="a11y-hidden">상품 주문 수량 입력란</span>
            </label>
            </Box>
            <Box sx={{display:"flex", alignItems:"center"}}>
            <button
            type="button"
            disabled={quantity === 1}
            aria-label="수량 내리기"
            onClick={() => onClick(-1)}
          >
            <RemoveIcon/>
          </button>
            <input
              type="number"
              min={1}
              value={quantity}
              style={{width:"40px", height:"32px", textAlign:"center"}}
              max={stock}
              disabled
              readOnly
            />
          <button
            type="button"
            disabled={stock < 1 || stock === quantity}
            aria-label="수량 올리기"
            onClick={() => onClick(1)}
          >
            <AddIcon />
          </button>
          </Box>
        </Box>
    );
  }