

const HeadingInfo = () => {
    return (
        <s-section>
        <div style={{display: "flex", justifyContent:"space-between"}}>
          <div>
            <h2 style={{marginTop: "0rem", marginBottom: "0.5rem"}}>Dashboard</h2>
            <s-paragraph>Manage your pre-orders and track performance</s-paragraph>
          </div>
          <div>
            <s-button variant="primary" icon="product">Add Product</s-button>
          </div>
        </div>
      </s-section>
    );
};

export default HeadingInfo;