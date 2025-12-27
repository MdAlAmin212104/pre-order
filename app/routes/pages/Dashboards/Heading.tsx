const HeadingInfo = () => {
  return (
    <s-section>
      <s-grid gridTemplateColumns="repeat(4, 1fr)"
        gap="small"
        justifyContent="center"
        paddingBlockEnd="base">
        <s-grid-item gridColumn="span 3">
          <s-heading><strong>Dashboard</strong>
          </s-heading>
          <s-paragraph>Manage your pre-orders and track performance</s-paragraph>
        </s-grid-item>
        <s-grid-item gridColumn="span 1">
          <s-stack direction="inline" justifyContent="end">
            <s-button variant="primary" href='/app/product/new'>Add Product</s-button>
          </s-stack>
        </s-grid-item>
      </s-grid>
    </s-section>
  );
};

export default HeadingInfo;