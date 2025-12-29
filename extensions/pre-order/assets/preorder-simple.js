/**
 * Simple Pre-Order Button Changer
 * Changes ALL "Add to Cart" buttons to "Pre-Order" 
 * Works on ALL products - no conditions
 */

(function() {
  'use strict';

  // ===== CONFIGURATION =====
  const CONFIG = {
    newButtonText: 'Pre-Order',  // Change this text as needed
    buttonClass: 'preorder-btn',  // Custom CSS class
    
    // Button selectors - covers most Shopify themes
    selectors: [
      'form[action*="/cart/add"] button[type="submit"]',
      'form[action*="/cart/add"] button[name="add"]',
      'form[action*="/cart/add"] input[type="submit"]',
      'button[name="add"]',
      'button.product-form__submit',
      '.product-form__submit',
      'button[data-add-to-cart]',
      '[data-add-to-cart-button]',
      '.add-to-cart',
      '.btn--add-to-cart',
    ]
  };

  /**
   * Change a single button text and style
   */
  function changeButton(button) {
    if (!button || button.dataset.preorderChanged) return;

    // Save original text (optional, for debugging)
    button.dataset.originalText = button.textContent.trim();

    // Method 1: Change text content directly
    button.textContent = CONFIG.newButtonText;

    // Method 2: If button has spans/icons, target text node only
    // Uncomment this if Method 1 removes icons:
    /*
    const textNodes = Array.from(button.childNodes).filter(
      node => node.nodeType === Node.TEXT_NODE
    );
    textNodes.forEach(node => {
      if (node.textContent.trim()) {
        node.textContent = CONFIG.newButtonText;
      }
    });
    */

    // Add custom class for styling
    button.classList.add(CONFIG.buttonClass);

    // Mark as changed to avoid duplicate processing
    button.dataset.preorderChanged = 'true';

    console.log('✅ Button changed:', button);
  }

  /**
   * Find and change all Add to Cart buttons
   */
  function changeAllButtons(root = document) {
    console.log('🔍 Searching for buttons...');
    
    const foundButtons = new Set();

    // Try each selector
    CONFIG.selectors.forEach(selector => {
      try {
        const buttons = root.querySelectorAll(selector);
        buttons.forEach(btn => foundButtons.add(btn));
      } catch (e) {
        console.warn('Selector failed:', selector, e);
      }
    });

    console.log(`📦 Found ${foundButtons.size} buttons`);

    // Change each button
    foundButtons.forEach(changeButton);
  }

  /**
   * Initialize and watch for dynamic content
   */
  function init() {
    console.log('🚀 Pre-Order Script Loaded');

    // Change buttons on page load
    changeAllButtons();

    // Handle Shopify Theme Editor section reloads
    document.addEventListener('shopify:section:load', function(event) {
      console.log('📦 Shopify section loaded');
      changeAllButtons(event.target);
    });

    // Handle dynamic content (Ajax, Quick View, Infinite Scroll)
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) { // Element node
              changeAllButtons(node);
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      console.log('👀 Watching for dynamic content');
    }

    // Handle Shopify Ajax Cart updates
    document.addEventListener('cart:updated', function() {
      console.log('🛒 Cart updated');
      setTimeout(() => changeAllButtons(), 100);
    });

    // Handle variant changes
    document.addEventListener('variant:change', function() {
      console.log('🔄 Variant changed');
      setTimeout(() => changeAllButtons(), 100);
    });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global function for manual triggering
  window.updatePreOrderButtons = changeAllButtons;

})();