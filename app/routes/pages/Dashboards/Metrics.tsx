
const Metrics = () => {
    return (
              <s-section padding="base">
        <s-grid
          gridTemplateColumns="@container (inline-size <= 400px) 1fr, 1fr auto 1fr auto 1fr"
          gap="small"
        >
          <s-clickable
            href="#"
            paddingBlock="small-400"
            paddingInline="small-100"
            borderRadius="base"
          >
            <s-grid gap="small-300">
              <s-heading>Active Pre-Orders</s-heading>
              <s-stack direction="inline" gap="small-200">
                <s-text>156</s-text>
                <s-badge tone="success" icon="arrow-up">
                  12%
                </s-badge>
              </s-stack>
            </s-grid>
          </s-clickable>
          <s-divider direction="block" />
          <s-clickable
            href="#"
            paddingBlock="small-400"
            paddingInline="small-100"
            borderRadius="base"
          >
            <s-grid gap="small-300">
              <s-heading>Products Enabled</s-heading>
              <s-stack direction="inline" gap="small-200">
                <s-text>2,847</s-text>
                <s-badge tone="warning">0%</s-badge>
              </s-stack>
            </s-grid>
          </s-clickable>
          <s-divider direction="block" />
          <s-clickable
            href="#"
            paddingBlock="small-400"
            paddingInline="small-100"
            borderRadius="base"
          >
            <s-grid gap="small-300">
              <s-heading>Revenue Secured</s-heading>
              <s-stack direction="inline" gap="small-200">
                <s-text>3.2%</s-text>
                <s-badge tone="critical" icon="arrow-down">
                  0.8%
                </s-badge>
              </s-stack>
            </s-grid>
          </s-clickable>
        </s-grid>
      </s-section>
    );
};

export default Metrics;