# E-commerce Pricing Structure

## Overview
This project now uses a professional e-commerce pricing model where:
- Admin enters **Original Price** and **Discount Percentage** (optional)
- **Discounted Price** is **auto-calculated** and rounded to nearest 10

## Product Structure

### Type Definition (`src/types/index.ts`)
```typescript
export interface Product {
  id: string;
  name: string;
  category: CategoryValue;
  originalPrice: number;        // Base/MRP price (required)
  discountPercent?: number;     // Discount % (optional: 0-100)
  // ... other fields
}
```

### Helper Functions

#### `getDiscountedPrice(product: Product): number`
- Calculates the final selling price
- If no discount: returns `originalPrice`
- If discount exists: calculates `originalPrice * (1 - discountPercent / 100)`
- **Rounds to nearest 10** for clean pricing

**Example:**
```typescript
// Product with discount
{ originalPrice: 399, discountPercent: 25 }
// Returns: 300 (calculated from 299.25, rounded to 300)

// Product without discount
{ originalPrice: 950 }
// Returns: 950
```

#### `hasDiscount(product: Product): boolean`
- Returns `true` if product has active discount
- Returns `false` if discount is null, undefined, or 0

## UI Behavior

### Product WITHOUT Discount
```typescript
{
  originalPrice: 950,
  // discountPercent is omitted or 0
}
```
**Frontend Shows:**
- ✅ Price: Rs. 950
- ❌ No strikethrough price
- ❌ No discount badge

### Product WITH Discount
```typescript
{
  originalPrice: 399,
  discountPercent: 25
}
```
**Frontend Shows:**
- ✅ Final Price: Rs. 300 (in large blue text)
- ✅ Original Price: ~~Rs. 399~~ (strikethrough, smaller, gray)
- ✅ Discount Badge: "25% OFF" (red badge, top-left corner)

## Admin Interface (Future)

When building admin panel, implement:

```typescript
// Admin Form
originalPrice: number (input)
discountPercent: number (input, 0-100)

// Live Preview (calculated on-the-fly)
const previewPrice = originalPrice * (1 - discountPercent / 100);
const finalPrice = Math.round(previewPrice / 10) * 10;

// Show admin:
"Final Price: Rs. {finalPrice}"
"Savings: Rs. {originalPrice - finalPrice}"
```

## Examples

### Example 1: Emergency Light (No Discount)
```typescript
{
  id: 'emergency-light',
  name: 'Rechargeable Emergency Light',
  originalPrice: 950,
  // No discountPercent
}
```
**Result:** Shows Rs. 950 only

### Example 2: Smart LED Bulb (With Discount)
```typescript
{
  id: 'smart-led-bulb',
  name: 'Smart LED Bulb 12W',
  originalPrice: 399,
  discountPercent: 25,
}
```
**Calculation:**
- Base: 399
- 25% off: 399 * 0.75 = 299.25
- **Rounded: Rs. 300**

**Result:** Shows Rs. 300, ~~Rs. 399~~, "25% OFF"

## Benefits

✅ **Single Source of Truth** - Only need to change discount %
✅ **Consistency** - No mismatch between discount % and actual price
✅ **Flexibility** - Easy to add/remove discounts
✅ **Professional** - Follows industry best practices (Shopify, Amazon, etc.)
✅ **Bulk Operations** - Easy to apply seasonal discounts to multiple products
✅ **Clean Pricing** - Rounded to 10s for psychological pricing

## Migration from Old Structure

**Old Structure:**
```typescript
{
  price: 299,           // ❌ Removed
  originalPrice: 399,   // ✅ Kept, now required
  discount: 25,         // ❌ Removed
}
```

**New Structure:**
```typescript
{
  originalPrice: 399,      // ✅ Required
  discountPercent: 25,     // ✅ Optional
  // price is auto-calculated
}
```

## Usage in Components

```typescript
import { getDiscountedPrice, hasDiscount } from '@/types';

// In component
const finalPrice = getDiscountedPrice(product);
const showDiscount = hasDiscount(product);

// Display
<span>Rs. {finalPrice.toLocaleString()}</span>
{showDiscount && (
  <span>Rs. {product.originalPrice.toLocaleString()}</span>
)}
```

---

**Last Updated:** October 23, 2025
**Status:** ✅ Implemented
