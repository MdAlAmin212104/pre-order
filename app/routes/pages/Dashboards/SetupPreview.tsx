import { useState } from "react";

const SetupPreview = () => {
  const [visible, setVisible] = useState({ setupGuide: true });
  const [expanded, setExpanded] = useState({
    setupGuide: true,
    step1: false,
    step2: false,
    step3: false,
  });
  const [progress, setProgress] = useState(0);
  const totalSteps = 3;

  const handleCheckbox = (checked: boolean) => {
    setProgress((prev) => {
      let newProgress = checked ? prev + 1 : prev - 1;
      if (newProgress < 0) newProgress = 0;
      if (newProgress > totalSteps) newProgress = totalSteps;
      return newProgress;
    });
  };

  return (
    <>
      {visible.setupGuide && (
        <s-section>
          {/* Header */}
          <s-grid gap="small">
            <s-grid gap="small-200" gridTemplateColumns="1fr auto auto" alignItems="center">
              <s-heading>Setup Guide</s-heading>
              <s-button
                accessibilityLabel="Dismiss Guide"
                onClick={() => setVisible({ ...visible, setupGuide: false })}
                variant="tertiary"
                tone="neutral"
                icon="x"
              />
              <s-button
                accessibilityLabel="Toggle setup guide"
                onClick={() => setExpanded({ ...expanded, setupGuide: !expanded.setupGuide })}
                variant="tertiary"
                tone="neutral"
                icon={expanded.setupGuide ? "chevron-up" : "chevron-down"}
              />
            </s-grid>
            <s-paragraph>
              Use this personalized guide to get your store ready for sales.
            </s-paragraph>
            <s-paragraph color="subdued">
              {progress} out of {totalSteps} steps completed
            </s-paragraph>
          </s-grid>

          {/* Steps Container */}
          {expanded.setupGuide && (
            <s-box borderRadius="base" border="base" background="base">
              {/* Step 1 */}
              <s-box>
                <s-grid gridTemplateColumns="1fr auto" gap="base" padding="small">
                  <s-checkbox
                    label="Upload an image for your puzzle"
                    onInput={(e) => handleCheckbox(e.currentTarget.checked)}
                  />
                  <s-button
                    onClick={() => setExpanded({ ...expanded, step1: !expanded.step1 })}
                    accessibilityLabel="Toggle step 1 details"
                    variant="tertiary"
                    icon={expanded.step1 ? "chevron-up" : "chevron-down"}
                  />
                </s-grid>
                {expanded.step1 && (
                  <s-box padding="small">
                    <s-box padding="base" background="subdued" borderRadius="base">
                      <s-grid gridTemplateColumns="1fr auto" gap="base" alignItems="center">
                        <s-grid gap="small-200">
                          <s-paragraph>
                            Start by uploading a high-quality image for your puzzle. For best
                            results, use images at least 1200x1200 pixels.
                          </s-paragraph>
                          <s-stack direction="inline" gap="small-200">
                            <s-button variant="primary">Upload image</s-button>
                            <s-button variant="tertiary" tone="neutral">
                              Image requirements
                            </s-button>
                          </s-stack>
                        </s-grid>
                        <s-box maxBlockSize="80px" maxInlineSize="80px">
                          <s-image
                            src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                            alt="Customize checkout illustration"
                          />
                        </s-box>
                      </s-grid>
                    </s-box>
                  </s-box>
                )}
              </s-box>

              {/* Step 2 */}
              <s-divider />
              <s-box>
                <s-grid gridTemplateColumns="1fr auto" gap="base" padding="small">
                  <s-checkbox
                    label="Choose a puzzle template"
                    onInput={(e) => handleCheckbox(e.currentTarget.checked)}
                  />
                  <s-button
                    onClick={() => setExpanded({ ...expanded, step2: !expanded.step2 })}
                    accessibilityLabel="Toggle step 2 details"
                    variant="tertiary"
                    icon={expanded.step2 ? "chevron-up" : "chevron-down"}
                  />
                </s-grid>
                {expanded.step2 && (
                  <s-box padding="small">
                    <s-box padding="base" background="subdued" borderRadius="base">
                      <s-grid gridTemplateColumns="1fr auto" gap="base" alignItems="center">
                        <s-grid gap="small-200">
                          <s-paragraph>
                            Select a template for your puzzle: 9-piece (beginner), 16-piece
                            (intermediate), or 25-piece (advanced).
                          </s-paragraph>
                          <s-stack direction="inline" gap="small-200">
                            <s-button variant="primary">Choose template</s-button>
                            <s-button variant="tertiary" tone="neutral">
                              See all templates
                            </s-button>
                          </s-stack>
                        </s-grid>
                        <s-box maxBlockSize="80px" maxInlineSize="80px">
                          <s-image
                            src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                            alt="Customize checkout illustration"
                          />
                        </s-box>
                      </s-grid>
                    </s-box>
                  </s-box>
                )}
              </s-box>

              {/* Step 3 */}
              <s-divider />
              <s-box>
                <s-grid gridTemplateColumns="1fr auto" gap="base" padding="small">
                  <s-checkbox
                    label="Customize puzzle piece shapes"
                    onInput={(e) => handleCheckbox(e.currentTarget.checked)}
                  />
                  <s-button
                    onClick={() => setExpanded({ ...expanded, step3: !expanded.step3 })}
                    accessibilityLabel="Toggle step 3 details"
                    variant="tertiary"
                    icon={expanded.step3 ? "chevron-up" : "chevron-down"}
                  />
                </s-grid>
                {expanded.step3 && (
                  <s-box padding="small">
                    <s-box padding="base" background="subdued" borderRadius="base">
                      <s-grid gridTemplateColumns="1fr auto" gap="base" alignItems="center">
                        <s-grid gap="small-200">
                          <s-paragraph>
                            Customize the shapes of puzzle pieces: classic, curved, or themed.
                          </s-paragraph>
                          <s-stack direction="inline" gap="small-200">
                            <s-button variant="primary">Customize pieces</s-button>
                            <s-button variant="tertiary" tone="neutral">
                              Learn about piece styles
                            </s-button>
                          </s-stack>
                        </s-grid>
                        <s-box maxBlockSize="80px" maxInlineSize="80px">
                          <s-image
                            src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                            alt="Customize checkout illustration"
                          />
                        </s-box>
                      </s-grid>
                    </s-box>
                  </s-box>
                )}
              </s-box>
            </s-box>
          )}
        </s-section>
      )}
    </>
  );
};

export default SetupPreview;
