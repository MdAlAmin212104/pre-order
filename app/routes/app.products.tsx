import Home from "./pages/Products/Home";

const Products = () => {

    const buttonClick = () => {
        console.log("button click");
    }
    
    return (
        <s-page>
            <Home/>
            <s-section>
                <s-button variant="primary" onClick={buttonClick}>Save</s-button>
            </s-section>

        </s-page>
    );
};

export default Products;