# 🍔 QuickBite - Campus Food Ordering App

A full-featured, responsive React Native (Expo) mobile application designed for university campus food ordering. Built as a university assignment project.

**Author:** Sasini Siriwardhana  
**Student ID:** IM2023125  
**Course Assignment:** Mobile Application Development  

---

## 📱 Features

- **Splash Screen**: 2-second branded splash with auto-navigation.
- **Authentication**: Student login with Full Name and Student ID validation + "Continue as Guest" mode.
- **Menu Catalog**: 10 campus food items categorized into *Meals*, *Beverages*, and *Snacks*.
- **Search & Filter**: Real-time keyword search bar and category filter chips.
- **Responsive Grid**: Adaptive 2-column layout on mobile phones and 3-column layout on tablets using `useWindowDimensions`.
- **Item Detail Screen**: Quantity selector (`+` / `-`), special instructions text field, and total price calculation.
- **Cart Management**: Dynamic cart item count badge, quantity update, item removal, subtotal calculation, and fixed campus delivery/service fee (Rs. 50).
- **Local Persistence**: Cart state and completed orders saved to local device storage using `@react-native-async-storage/async-storage`.
- **Checkout & Order Placement**: Campus pickup location selection, payment method options, and order confirmation with unique Order ID (`QBxxxxxx`).
- **Order Tracking & Timeline**: Visual status progression timeline (*Placed ➔ Preparing ➔ Ready for pickup*) with an interactive status simulator.
- **Student Profile**: User credentials, guest/registered status badge, and order history list.

---

## 🛠️ Tech Stack

- **Framework**: React Native with Expo (SDK 51)
- **Language**: JavaScript (ES6+)
- **Navigation**: React Navigation v6 (Native Stack + Bottom Tabs)
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Storage**: `@react-native-async-storage/async-storage`
- **State Management**: React Context API (`CartContext`)

---

## 📂 Project Structure

```text
quickbite_app/
├── App.js                         # Root entry component
├── package.json                   # Dependencies & Expo scripts
├── app.json                       # Expo configuration
├── .gitignore                     # Git ignored paths
├── README.md                      # Documentation
├── src/
│   ├── context/
│   │   └── CartContext.js         # Cart, Order & User global state
│   ├── data/
│   │   └── menuData.js            # Menu items array & categories
│   ├── navigation/
│   │   └── AppNavigator.js        # Stack and Bottom Tab Navigators
│   ├── components/
│   │   └── MenuItemCard.js        # Reusable food card component
│   ├── screens/
│   │   ├── SplashScreen.js        # 2-second splash screen
│   │   ├── LoginScreen.js         # Student login form & guest entry
│   │   ├── HomeScreen.js          # Responsive food grid & search
│   │   ├── ItemDetailScreen.js    # Item details & quantity selection
│   │   ├── CartScreen.js          # Cart item list & bill details
│   │   ├── CheckoutScreen.js      # Location & payment selection
│   │   ├── OrderTrackingScreen.js # Real-time order status timeline
│   │   └── ProfileScreen.js       # Student profile & order history
│   └── theme/
│       └── colors.js              # Theme color palette & layout constants
└── screenshots/                   # Application screenshots
```

---

## 🚀 Installation & Running

### 1. Clone the repository
```bash
git clone https://github.com/SasiniSiriwardhana/quickbite-app.git
cd quickbite_app
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start Expo development server
```bash
npx expo start -c
```

### 4. Run on Device / Emulator
- **Android Emulator**: Press `a` in the terminal.
- **Physical Device**: Open **Expo Go** app and scan the QR code displayed in terminal.

---

## 🧪 Test Cases Summary

| ID | Test Scenario | Expected Result | Result |
|---|---|---|---|
| TC-01 | Splash Screen | Auto-navigates to Login after 2 seconds | PASS |
| TC-02 | Form Validation | Alert appears if Name or Student ID is empty | PASS |
| TC-03 | Guest Mode | Logs in as Guest and navigates to Home | PASS |
| TC-04 | Search Filter | Filters menu items dynamically by input query | PASS |
| TC-05 | Category Filter | Shows items matching selected category | PASS |
| TC-06 | Add to Cart | Item quantity increments and cart badge updates | PASS |
| TC-07 | Cart State Persistence | Cart items remain saved after app reload | PASS |
| TC-08 | Order Placement | Generates Order ID (`QBxxxxxx`) and clears cart | PASS |
| TC-09 | Status Simulator | Cycles order status from Placed ➔ Preparing ➔ Ready | PASS |
| TC-10 | Responsive Grid | Adjusts columns based on screen width (2 phone / 3 tablet) | PASS |

---

## 🖼️ Screenshots

Screenshots of the QuickBite application can be found in the `screenshots/` directory:
- `splash_screen.jpg`
- `login_screen.jpg`
- `home_screen.jpg`
- `item_detail_screen.jpg`
- `cart_screen.jpg`
- `checkout_screen.jpg`
- `order_tracking_screen.jpg`
- `profile_screen.jpg`

---

## 👤 Author

- **Name**: Sasini Siriwardhana
- **Student ID**: IM2023125
- **GitHub**: [SasiniSiriwardhana](https://github.com/SasiniSiriwardhana)
- **Repository**: [quickbite-app](https://github.com/SasiniSiriwardhana/quickbite-app)
