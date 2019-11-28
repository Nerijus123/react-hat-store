import React, {Component} from 'react'


// created the context object and then two components provider
const ProductContext = React.createContext();
//provider
//consumer
//another component with product provider where returning provider component 
class ProductProvider extends Component {
    render() {
        return (
            <ProductContext.Provider value="hello from context">
                {this.props.children}
            </ProductContext.Provider>
        );
    }
}

//export product provider as well as product consumer
const ProductConsumer = ProductContext.Consumer;

export { ProductProvider,ProductConsumer };
