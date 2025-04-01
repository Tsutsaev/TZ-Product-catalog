import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import {AppBar, Toolbar, Button, Container, InputBase, alpha} from "@mui/material";
import Cart from "./components/Cart.tsx";
import IconButtonWithBadge from "./components/Badge.tsx";
import {styled} from "@mui/material/styles";
import SearchIcon from '@mui/icons-material/Search';
import {ChangeEvent} from "react";
import {setSearchQuery} from "./store/ searchSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "./store/store.ts";

function App() {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        width: '100%',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }));
    const dispatch = useDispatch<AppDispatch>();
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchQuery(e.target.value));
    };

    return (
        <Router>
            <AppBar  position="static">
            <Container>
                    <Toolbar >
                        <Button color="inherit" sx={{ mr: 2 }} component={Link} to="/" >Каталог товаров</Button>
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Search…"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={handleChange}

                            />
                        </Search>
                        <IconButtonWithBadge />
                    </Toolbar>
            </Container>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cart" element={<Cart />} />
                </Routes>
            </Container>
        </Router>
    );
}

export default App;