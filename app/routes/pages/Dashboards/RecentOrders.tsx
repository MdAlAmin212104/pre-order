const RecentOrders = () => {
    const recentOrders = [
        {
            id: "1",
            customer: "John Smith",
            product: "Limited Edition Sneakers",
            date: "2 hours ago",
            status: "pending" as const,
            amount: "$189.00",
        },
        {
            id: "2",
            customer: "Sarah Johnson",
            product: "Wireless Headphones Pro",
            date: "5 hours ago",
            status: "confirmed" as const,
            amount: "$299.00",
        },
        {
            id: "3",
            customer: "Mike Davis",
            product: "Smart Watch Series X",
            date: "1 day ago",
            status: "fulfilled" as const,
            amount: "$449.00",
        },
    ];

    const getBadgeStatus = (status: string) => {
        switch (status) {
            case "fulfilled":
                return "success";
            case "confirmed":
                return "info";
            default:
                return "warning";
        }
    };

    return (
        <s-section>
            <s-grid gridTemplateColumns="repeat(4, 1fr)"
                gap="small"
                justifyContent="center"
                paddingBlockEnd="base"
                placeContent="space-between"
                alignItems="center">
                <s-grid-item gridColumn="span 3">
                    <s-heading> <strong>Recent Orders</strong>
                    </s-heading>
                </s-grid-item>
                <s-grid-item gridColumn="span 1">
                    <s-stack direction="inline" gap="small" justifyContent="end"><s-button variant="secondary">View all</s-button></s-stack>

                </s-grid-item>
            </s-grid>
            <div>
                {recentOrders.map((order) => (
                    <s-box
                        key={order.id}
                        padding="base"
                        background="subdued"
                        border="base"
                    >
                        <s-grid
                            gridTemplateColumns="repeat(4, 1fr)"
                            gap="small"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <s-grid-item gridColumn="span 3">
                                <s-stack direction="inline" gap="small" justifyContent="start" alignItems="center" alignContent="center">
                                    <s-thumbnail
                                        alt="White sneakers"
                                        src="https://cdn.shopify.com/static/images/polaris/thumbnail-wc_src.jpg"
                                    />
                                    <s-box>
                                        <s-paragraph><strong>{order.product}</strong></s-paragraph>
                                        <s-paragraph>
                                            {order.customer} • {order.date}
                                        </s-paragraph>
                                    </s-box>
                                </s-stack>
                            </s-grid-item>
                            <s-grid-item gridColumn="span 1">
                                <s-stack direction="inline" gap="small" justifyContent="end" alignItems="center" alignContent="center">
                                    <s-badge tone={getBadgeStatus(order.status)}>
                                        {order.status}
                                    </s-badge>
                                    <s-paragraph>
                                        <strong>{order.amount}</strong>
                                    </s-paragraph>
                                </s-stack>
                            </s-grid-item>
                        </s-grid>
                    </s-box>
                ))}
            </div>
        </s-section>
    );
};

export default RecentOrders;
