import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectProducts } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";
import { AppDispatch } from "../store/store";
import { Container, Card, CardContent, CardMedia, Typography, Button, CircularProgress } from "@mui/material";
import s from './styles.module.css';
import {selectSearchQuery} from "../store/ searchSlice.ts";

const Home: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, status } = useSelector(selectProducts);
    const searchQuery = useSelector(selectSearchQuery);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === "loading") return <CircularProgress />;
    if (status === "failed") return <Typography color="error">Ошибка загрузки</Typography>;

    const filteredProducts = items.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container className={s.grid}>
                {filteredProducts.map((product) => (
                    <Card key={product.id} className={s.card}>
                        <CardMedia component="img" height="140" image={product.image} alt={product.title} />
                        <CardContent className={s.cardContent}>
                            <Typography variant="h6">{product.title}</Typography>
                            <Typography variant="body2" color="textSecondary">{product.price} $</Typography>
                            <Button variant="contained" className={s.btn} color="primary" onClick={() => dispatch(addToCart(product))} fullWidth>
                                Добавить в корзину
                            </Button>
                        </CardContent>
                    </Card>
                ))}
        </Container>
    );
};

export default Home;