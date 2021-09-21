import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Header() {
    const user = JSON.parse(localStorage.getItem('user-info'));
    // console.log('USER', user);
    const history = useHistory()

    function logOut() {
        localStorage.clear();
        history.push('/login');
    }
    return (
        <div style={{ marginBottom: 30 }}>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="/"><img style={{ width: 100 }} src='/images/dashboard_icon.png' alt='Dashboard'></img></Navbar.Brand>
                    <Nav className="me-auto navbar-link">
                        {
                            localStorage.getItem('user-info') ?
                                <>
                                    <Link to='/'>Product List</Link>
                                    <Link to='/addProd'>Add Product</Link>
                                    <Link to='/searchProd'>Search Product</Link>
                                    {/* <Link to='/updateProd'>Update Product</Link> */}
                                </>
                                :
                                <>
                                    <Link to='/login'>Login</Link>
                                    <Link to='/register'>Register</Link>
                                </>
                        }
                    </Nav>
                    {localStorage.getItem('user-info') ?
                        <Nav>
                            <NavDropdown style={{ textTransform: 'capitalize' }} title={user && user.first_name ? 'Welcome ' + user.first_name : 'Welcome'}>
                                <NavDropdown.Item><Link to='/profile' style={{ textDecoration: 'none' }}>Profile</Link></NavDropdown.Item>
                                <NavDropdown.Item onClick={logOut}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        : null
                    }
                </Container>
            </Navbar>
        </div>
    )
}

export default Header