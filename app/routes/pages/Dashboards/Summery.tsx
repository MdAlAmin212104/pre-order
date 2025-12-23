/* eslint-disable @typescript-eslint/no-explicit-any */
const Summery = () => {
  const stats = [
  {
    name: "Active Pre-Orders",
    value: "47",
    change: "+12%",
    changeType: "positive" as const,
    icon: "cart",
  },
  {
    name: "Products Enabled",
    value: "23",
    change: "+3",
    changeType: "positive" as const,
    icon: "product",
  },
  {
    name: "Revenue Secured",
    value: "$12,459",
    change: "+18%",
    changeType: "positive" as const,
    icon: "payment",
  },
  {
    name: "Avg. Wait Time",
    value: "14 days",
    change: "-2 days",
    changeType: "positive" as const,
    icon: "calendar-time",
  },
];

  return (
    <s-section>
      <div
        style={{
          display: "grid",
          gap: "16px",
          gridTemplateColumns: "repeat(1, 1fr)",
          // responsive using inline style + media queries is tricky, so we use CSS inside a <style>
        }}
      >
        <style>
          {`
            @media (min-width: 600px) {
              div[style*="display: grid"] {
                grid-template-columns: repeat(2, 1fr) !important;
              }
            }
            @media (min-width: 1024px) {
              div[style*="display: grid"] {
                grid-template-columns: repeat(4, 1fr) !important;
              }
            }
          `}
        </style>

        {stats.map((stat) => (
            <s-box key={stat.name} padding="base"
                background="subdued"
                border="base"
                borderRadius="base">
                <div  style={{display: "flex", justifyContent: "space-between"}}>
                    <div>
                        <s-heading>{stat.name}</s-heading>
                        <s-paragraph>{stat.value}</s-paragraph>
                        <div style={{display: "flex", gap: "4px", alignItems: "center"}}>
                            <s-icon type="chart-line" />
                            <s-paragraph>{stat.change}</s-paragraph>

                        </div>
                        
                    </div>
                    
                    <s-icon type={stat.icon as any} />
                </div>
            </s-box>
          
        ))}
      </div>
    </s-section>
  );
};

export default Summery;
