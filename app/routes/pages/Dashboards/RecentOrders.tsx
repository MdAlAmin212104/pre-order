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
            <div style={{display: "flex", justifyContent: "space-between", marginBlock: "1rem"}}>
                <h2 style={{ marginTop: "0rem", marginBottom: "0.5rem" }}>
                    Recent Orders
                </h2>
                <s-button variant="secondary">View all</s-button>
            </div>
            <div>
                {recentOrders.map((order) => (
                    <s-box
                        key={order.id}
                        padding="base"
                        background="subdued"
                        border="base"
                    >
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                                <s-thumbnail
                                    alt="White sneakers"
                                    src="https://cdn.shopify.com/static/images/polaris/thumbnail-wc_src.jpg"
                                />
                                <div>
                                    <s-paragraph><strong>{order.product}</strong></s-paragraph>
                                    <s-paragraph>
                                        {order.customer} • {order.date}
                                    </s-paragraph>
                                </div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                                <s-badge tone={getBadgeStatus(order.status)}>
                                    {order.status}
                                </s-badge>
                                <s-paragraph><strong>{order.amount}</strong></s-paragraph>
                            </div>
                        </div>
                    </s-box>
                ))}
            </div>
        </s-section>
    );
};

export default RecentOrders;
