import React from 'react';
import './Header.scss';
import logo from '../../assets/logo_ml.png';
import logo2x from '../../assets/logo_ml@2x.png';
import searchicon from '../../assets/ic_search.png';
import searchicon2x from '../../assets/ic_search@2x.png';
import { withRouter, Link } from 'react-router-dom';

const Header = props => {
    const onSearch = e => {
        e.preventDefault();
        const { value } = e.target.search;
        value.trim() !== "" && props.history.push({
            pathname: '/items',
            search: `?q=${value}`,
        });
    }
    return (
        <header className='header'>
            <nav className='container flex'>
                <Link to='/'><img src={logo} srcSet={logo + ' 1x,' + logo2x + ' 2x'} alt='Mercado Libre' className='header__brand--logo' /></Link>
                <form className="header__search__container f1 flex__strech" onSubmit={onSearch}>
                    <input type='text' name='search' className='f1' placeholder='Nunca dejes de buscar' />
                    <button><img src={searchicon} alt='Ícono de búsqueda' srcSet={searchicon + ' 1x,' + searchicon2x + ' 2x'} /></button>
                </form>
            </nav>
        </header>
    )
}

export default withRouter(Header);