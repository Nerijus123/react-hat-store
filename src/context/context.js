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
    state = {
        sidebarOpen: false,
        cartOpen: false,
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

    componentDidMount() {
        //from contentful items    
        this.setProducts(items);
    }
    
    //set products    
    setProducts = products => {
        let storeProducts = products.map(item => {
          const { id } = item.sys;
          const image = item.fields.image.fields.file.url;
          const product = { id, ...item.fields, image };
          return product;
        });

        //  featured products
        let featuredProducts = storeProducts.filter(item => item.featured === true);
        this.setState({
          storeProducts,
          filteredProducts: storeProducts,
          featuredProducts,
          cart: this.getStorageCart(),
          singleProduct: this.getStorageProduct(),
          loading: false
        });
    };

      // get cart from local storage
    getStorageCart = () => {
        return [];
    };

      // get product from local storage
    getStorageProduct = () => {
        return {};
    };

      // get totals
    getTotals = () => {};

      //add totals
    addTotals = () => {};

      // sync storage
    syncStorage = () => {};

      //add to cart
    addToCart = id => {
        console.log(`add to cart ${id}`);
    };

      // set single product
    setSingleProduct = id => {
        console.log(`set single product ${id}`);
    };

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
                    openCart: this.openCart,
                    addToCart: this.addToCart,
                    setSingleProduct: this.setSingleProduct
                }}>
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

//export product provider as well as product consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
