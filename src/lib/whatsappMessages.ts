import { CartItem } from '@/types';
import { WHATSAPP_CONFIG } from '@/config/whatsapp';

/**
 * Format a simple "Buy Now" message for a single product
 */
export function formatBuyNowMessage(productName: string, productId: string): string {
  const productUrl = `${WHATSAPP_CONFIG.WEBSITE_URL}/products/${productId}`;
  
  return `Hi! I want to buy this product:

🛍️ *${productName}*

🔗 Product Link: ${productUrl}

Please let me know the details for placing my order.`;
}

/**
 * Format a complete order message for checkout with customer details
 */
export function formatCheckoutMessage(
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: 'cod' | 'bank';
  },
  cartItems: CartItem[],
  subtotal: number,
  shippingFee: number,
  total: number
): string {
  // Format cart items with product links
  const itemsList = cartItems.map((item, index) => {
    // Extract product ID from image path or name
    // We'll need to pass product IDs along with cart items
    const itemLine = `${index + 1}. *${item.name}*
   Quantity: ${item.qty}
   Price: Rs. ${item.price.toLocaleString()} each
   Subtotal: Rs. ${(item.price * item.qty).toLocaleString()}`;
    
    return itemLine;
  }).join('\n\n');

  const message = `🛒 *NEW ORDER REQUEST*

━━━━━━━━━━━━━━━━
📋 *CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━
👤 Name: ${customerInfo.fullName}
📧 Email: ${customerInfo.email}
📱 Phone: ${customerInfo.phone}
🏠 Address: ${customerInfo.address}
🏙️ City: ${customerInfo.city}
📮 Postal Code: ${customerInfo.postalCode}
💳 Payment: ${customerInfo.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Bank Transfer'}

━━━━━━━━━━━━━━━━
🛍️ *ORDER ITEMS*
━━━━━━━━━━━━━━━━
${itemsList}

━━━━━━━━━━━━━━━━
💰 *PAYMENT SUMMARY*
━━━━━━━━━━━━━━━━
Subtotal: Rs. ${subtotal.toLocaleString()}
Shipping: ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee.toLocaleString()}`}
━━━━━━━━━━━━━━━━
*TOTAL: Rs. ${total.toLocaleString()}*
━━━━━━━━━━━━━━━━

🌐 Website: ${WHATSAPP_CONFIG.WEBSITE_URL}`;

  return message;
}

/**
 * Enhanced checkout message with individual product links
 */
export function formatCheckoutMessageWithLinks(
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    paymentMethod: 'cod' | 'bank';
  },
  cartItems: CartItem[],
  subtotal: number,
  shippingFee: number,
  total: number
): string {
  // Format cart items with product links
  const itemsList = cartItems.map((item, index) => {
    const productUrl = `${WHATSAPP_CONFIG.WEBSITE_URL}/products/${item.productId}`;
    
    const itemLine = `${index + 1}. *${item.name}*
   Quantity: ${item.qty}
   Price: Rs. ${item.price.toLocaleString()} each
   Subtotal: Rs. ${(item.price * item.qty).toLocaleString()}
   🔗 ${productUrl}`;
    
    return itemLine;
  }).join('\n\n');

  const message = `🛒 *NEW ORDER REQUEST*

━━━━━━━━━━━━━━━━
📋 *CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━
👤 Name: ${customerInfo.fullName}
📧 Email: ${customerInfo.email}
📱 Phone: ${customerInfo.phone}
🏠 Address: ${customerInfo.address}
🏙️ City: ${customerInfo.city}
📮 Postal Code: ${customerInfo.postalCode}
💳 Payment: ${customerInfo.paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Bank Transfer'}

━━━━━━━━━━━━━━━━
🛍️ *ORDER ITEMS*
━━━━━━━━━━━━━━━━
${itemsList}

━━━━━━━━━━━━━━━━
💰 *PAYMENT SUMMARY*
━━━━━━━━━━━━━━━━
Subtotal: Rs. ${subtotal.toLocaleString()}
Shipping: ${shippingFee === 0 ? 'FREE' : `Rs. ${shippingFee.toLocaleString()}`}
━━━━━━━━━━━━━━━━
*TOTAL: Rs. ${total.toLocaleString()}*
━━━━━━━━━━━━━━━━

🌐 Website: ${WHATSAPP_CONFIG.WEBSITE_URL}`;

  return message;
}
