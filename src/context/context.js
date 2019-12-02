import React, { Component } from 'react';
import { linkData } from './linkData';
import { socialData } from './socialData';
import { items } from './productData';

// created the context object and then two components provider
const ProductContext = React.createContext();
//provider
//consumer
//another component with product provider where returning provider component 
class ProductProvider extends Component {
    //toggling options
    state={
        sidebarOpen: false,
        cartOpen: false,
        cartItems: 5,
        links: linkData,
        socialIcons: socialData,
        cart: [],
        cartItems: 0,
        cartSubTotal: 0,
        cartTax: 0,
        carTotal: 0,
        storeProducts: [],
        filteredProducts: [],
        featuredProducts: [],
        singleProduct: {},
        loading: true
    }
    //handle sidebar
    handleSidebar = () => {
        this.setState({sidebarOpen: !this.state.sidebarOpen});
    }
    //hadnle cart
    handleCart = () => {
        this.setState({cartOpen:!this.state.sidebarOpen});
    }
    // close cart
    closeCart = () => {
        this.setState({cartOpen: false });
    }
    // open cart
    openCart = () => {
        this.setState({cartOpen: true });
    }

    render() {
        return (
            //pass the value down as an object
            <ProductContext.Provider 
                value={{
                    ...this.state,
                    handleSidebar: this.handleSidebar,
                    handleCart: this.handleCart,
                    closeCart: this.closeCart,
                    openCart: this.openCart
                }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

//export product provider as well as product consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
