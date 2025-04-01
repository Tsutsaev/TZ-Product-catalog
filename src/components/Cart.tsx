import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, selectCart } from "../store/cartSlice";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

const Cart: React.FC = () => {
    const dispatch = useDispatch();
    const cart = useSelector(selectCart);
    const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Корзина</Typography>
            {cart.length === 0 ? (
                <Typography>Корзина пуста</Typography>
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Название</TableCell>
                                <TableCell>Цена</TableCell>
                                <TableCell>Действие</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {cart.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{item.price} $</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="secondary" onClick={() => dispatch(removeFromCart(item.id))}>
                                            Удалить
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Typography variant="h6" sx={{ mt: 2 }}>Итого: {totalPrice.toFixed(2)} $</Typography>
        </Container>
    );
};

export default Cart;