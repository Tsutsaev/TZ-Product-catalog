import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import {useSelector} from "react-redux";
import {selectCart} from "../store/cartSlice.ts";
import { Link } from "react-router-dom";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function IconButtonWithBadge() {
    const cart = useSelector(selectCart);

    return (
        <IconButton component={Link} to={'cart'} sx={{ marginLeft: 'auto' }}  color="inherit">
            <ShoppingCartIcon fontSize="small" />
            <CartBadge badgeContent={cart.length} color="primary" overlap="circular" />
        </IconButton>
    );
}
