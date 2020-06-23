import React from 'react';
import './SearchItem.scss';
import shipping from '../../assets/ic_shipping.png';
import shipping2x from '../../assets/ic_shipping@2x.png';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';

const SearchItem = props => (
    <Link to={`/item/${props.id}`} className='SearchItem flex__strech'>
        <div className='SearchItem__image--container'>
            <img src={props.thumbnail} alt={props.title} />
            <div></div>
        </div>
        <div className='SearchItem__price--title'>
            <h2>
                <NumberFormat value={props.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                {props.shipping.free_shipping === true &&
                    <img src={shipping} srcSet={shipping + ' 1x,' + shipping2x + ' 2x'} alt='Envio Grátis' className='SearchItem__price--title--icon' />
                }
            </h2>
            <h3>{props.title}</h3>
        </div>
        <p className='SearchItem__state--name'>{props.address.state_name}</p>
    </Link>
)

export default SearchItem;