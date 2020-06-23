import React, { Component } from 'react';
import './ProductPage.scss';
import NumberFormat from 'react-number-format';
import Spinner from '../../ui/Spinner/Spinner';

class ProductPage extends Component {
    state = {
        isLoader: true,
        product: null,
        err: null,
    }
    render() {
        const { isLoader, product, err, description } = this.state;
        return (
            <div className='ProductPage SearchPage container col'>
                {!isLoader && !err && product && <p className='__grey flex'>
                    Electronica, Audio y Video <i className='material-icons'>chevron_right</i> iPad <i className='material-icons'>chevron_right</i> Reproduce <i className='material-icons'>chevron_right</i> iPod touch <i className='material-icons'>chevron_right</i> <b>32 GB</b>
                </p>}
                {err && <h2 className='m-a __err_color'>{err}</h2>}
                {isLoader && <Spinner />}
                {product && <div className='ProductPage__product'>
                    <div className='flex__strech ProductPage__product__details__wrapper'>
                        <div className='f1 ProductPage__product--container'>
                            <img src={product.pictures[0].secure_url} alt={product.title} />
                            <h1>Description del producto</h1>
                            <p className='ProductPage__description' >{description}</p>
                        </div>
                        <div className='ProductPage__product__details'>
                            <p>{product.condition} - {product.sold_quantity} vendidos</p>
                            <span>{product.subtitle}</span>
                            <h2>{product.title}</h2>
                            <h1><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'$'} /></h1>
                            <button>Comprar</button>
                        </div>
                    </div>

                </div>}
            </div>
        )
    }
    componentDidMount() {
        const { id } = this.props.match.params;
        fetch(`https://api.mercadolibre.com/items/${id}`)
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.error) return this.errHandler(res.error);
                this.setState({ product: res, isLoader: false });
            })
            .catch(this.errHandler)
        fetch(`https://api.mercadolibre.com/items/${id}/description`)
            .then(res => res.json())
            .then(res => this.setState({ description: res.plain_text }))
    }

    errHandler = err => {
        switch (err) {
            case "TypeError: Failed to fetch":
                return this.setState({ isLoader: false, err });
            case "not_found":
                return this.setState({ isLoader: false, err: 'Products not found!' });
            default:
                return this.setState({ isLoader: false, err: "Something went wrong!" })
        }
    }
}

export default ProductPage;