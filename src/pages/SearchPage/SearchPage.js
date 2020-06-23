import React, { Component } from 'react';
import './SearchPage.scss'
import Spinner from '../../ui/Spinner/Spinner';
import SearchItem from '../../components/SearchItem/SearchItem';

class SearchPage extends Component {
    state = {
        products: [],
        isLoader: false,
        err: null
    }
    search = this.props.location.search;
    render() {
        const { products, isLoader, err } = this.state;

        return (
            <div className='SearchPage container col'>
                {!isLoader && !err && products.length > 0 && <div>
                    <p className='__grey flex'>Electronica, Audio y Video <i className='material-icons'>chevron_right</i> iPad <i className='material-icons'>chevron_right</i> Reproduce <i className='material-icons'>chevron_right</i> iPod touch <i className='material-icons'>chevron_right</i> <b>32 GB</b></p>
                    <div className='SearchPage__search__results'>
                        {products.map((p) => <SearchItem key={p.id} {...p} />)}
                    </div>
                </div>}
                {isLoader && !err && <Spinner />}
                {err && <h2 className='m-a __err_color'>{err}</h2>}
                {products.length === 0 && !isLoader && !err && <h2 className='m-a'>¡Producto no encontrado!</h2>}
            </div>
        )
    }

    products = [];
    showProductsQty = 4;
    onSearch = () => {
        this.setState({ isLoader: true });
        fetch(`https://api.mercadolibre.com/sites/MLA/search${this.search}`)
            .then(res => res.json())
            .then(res => {
                console.log(res.results[0])
                this.showProductsQty = 4;
                this.products = res.results;
                this.setState({ products: res.results.slice(0, this.showProductsQty), isLoader: false, err: null });
            })
            .catch(this.errHandler)
    }

    componentDidMount = () => this.onSearch();

    componentDidUpdate = () => {
        const { search } = this.props.location;
        if (search !== this.search) {
            this.search = search;
            this.onSearch();
        }
    }

    errHandler = err => {
        console.log(err)
        switch (err) {
            case "TypeError: Failed to fetch":
                return this.setState({ isLoader: false, err });
            default:
                return this.setState({ isLoader: false, err: "Something went wrong!" })
        }
    }
}


export default SearchPage;