# FLAME & DOUGH Artisan Kitchen - Complete Restaurant System

A full-stack, enterprise-grade restaurant platform inspired by **Domino's Pizza** and **McDonald's**. Built with React, Vite, Tailwind CSS, Express, and persistent local database storage.

---

## Architecture & Project Structure

The project is structured into 4 distinct folders:

| Folder | Name & Role | Tech Stack | Port |
| :--- | :--- | :--- | :--- |
| **`front/`** | **Client Customer Website** (Domino's & Mac-style online ordering, customizer, cart, checkout & live 5-stage tracker) | React, Vite, Tailwind CSS, Lucide | `5173` |
| **`admin/`** | **Admin Management Portal** (Revenue analytics, live kitchen orders control, menu catalog CRUD, categories, restaurant settings) | React, Vite, Tailwind CSS, Lucide | `5174` |
| **`store/`** | **Staff Counter POS & Kitchen KDS** (Cashier order taking, Dine-in/Table picker, Takeaway, fast tender cash calculator, printable thermal receipt & real-time Kitchen Display System) | React, Vite, Tailwind CSS, Lucide | `5175` |
| **`back/`** | **Express REST API & Persistence** (Categories, Menu items, Orders, Coupons, Analytics, and auto-seeded realistic database) | Node.js, Express, CORS, JSON/SQLite DB | `5000` |

---

## Key Features

### 1. Consistent Brand Identity
- **Identical Brand Gradient**: Applied seamlessly across the entire suite:  
  `linear-gradient(135deg, #DC2626 0%, #EA580C 50%, #F59E0B 100%)` (Deep Crimson Red to Fiery Orange to Golden Amber).
- **Strictly Zero Emojis**: Every indicator, category, and button uses high-quality SVG vector icons via `lucide-react`.
- **Zero Dummy Data**: Pre-loaded with authentic artisanal items:
  - *Signature Pepperoni & Hot Honey Feast Pizza*
  - *Truffle Wild Mushroom & Ricotta Pizza*
  - *Fiery BBQ Smoked Chicken Supreme Pizza*
  - *The Big Double Smashmaster Burger*
  - *Buttermilk Crispy Buffalo Chicken Deluxe Burger*
  - *Peri-Peri Glazed Crispy Chicken Wings (8 pcs)*
  - *Loaded Cheddar Bacon Fries*
  - *Hand-Spun Madagascar Vanilla Shake*
  - *Warm Belgian Chocolate Lava Cake*
  - *The Domino Double & Mac Smash Value Combos*

### 2. Client Website (`front`)
- **Delivery & Pickup Switcher**: Fast switching between 30-min hot home delivery or store pickup.
- **Item Customizer Modal**: Real-time live price calculation when choosing Sizes (Regular, Medium, Large), Crusts (Hand-Tossed, Thin Crust, Cheese Burst), and Add-ons (Extra Mozzarella, Truffle glaze, Bacon, Dipping Sauces).
- **Interactive Cart & Coupons**: Validates real discount coupons:
  - `TASTY20`: 20% off orders above $20
  - `FEAST50`: $10 flat off orders above $40
  - `FREEDEL`: Free delivery
- **Live 5-Stage Order Tracker**: Auto-refreshing tracker matching Domino's pizza tracker:
  1. *Order Confirmed*
  2. *In the Oven & Grill*
  3. *Bake Tested & Packed*
  4. *Out for Delivery / Ready for Counter*
  5. *Delivered & Enjoyed*

### 3. Store POS & Staff Terminal (`store`)
- **Counter Cashier POS**:
  - Touch-friendly layout with large action buttons.
  - Dine-in mode with Table Number selection (Tables 1-16 or custom).
  - Takeaway and Phone Delivery modes.
  - Cash Tender calculator with preset buttons ($10, $20, $50, $100, Exact) and automatic Change Due display.
- **Authentic Printable Thermal Receipt**:
  - 80mm receipt preview matching McDonald's and Domino's receipts with tax invoice number, timestamp, cashier name, item breakdown, taxes, total, payment method, change returned, and barcode.
  - Standard `window.print()` trigger for ESC/POS thermal printers.
- **Kitchen Display System (KDS)**:
  - Real-time oven/grill queue with elapsed timers.
  - Visual alert triggers when an order exceeds 15 minutes.
  - One-tap status bump buttons (Start Baking -> Pack & Ready -> Hand to Guest).

### 4. Admin Management Portal (`admin`)
- **Executive Revenue Dashboard**: Total gross sales, active kitchen load, total volume, average ticket size, top-selling items ranking, and sales breakdown (Web vs POS, Delivery vs Takeaway vs Dine-in).
- **Live Kitchen Operations**: View incoming orders in real-time, bump statuses, update staff notes, or cancel tickets.
- **Menu Catalog Management**: Add new dishes, edit descriptions/pricing/variants, delete items, and one-click In-Stock / Sold-Out availability toggles.
- **Store Policies & Settings**: Configure restaurant name, contact, address, sales tax rate (%), delivery fee, free delivery threshold, and announcement banner.

---

## How to Run

### Option A: Run Everything Concurrently (One Command)
From the root directory:
```bash
npm run dev
```
This runs the Backend API (5000), Client Website (5173), Admin Portal (5174), and Store POS (5175) concurrently.

### Option B: Run Individually
Open separate terminals for each service:

1. **Backend Server**:
   ```bash
   cd back
   npm run dev
   # Runs on http://localhost:5000
   ```

2. **Client Website**:
   ```bash
   cd front
   npm run dev
   # Runs on http://localhost:5173
   ```

3. **Admin Portal**:
   ```bash
   cd admin
   npm run dev
   # Runs on http://localhost:5174
   ```

4. **Store Staff POS**:
   ```bash
   cd store
   npm run dev
   # Runs on http://localhost:5175
   ```
