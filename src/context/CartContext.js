import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const CartContext = createContext();

const STORAGE_KEYS = {
  USER: '@quickbite_user',
  CART: '@quickbite_cart',
  ORDERS: '@quickbite_orders',
};

export const CartProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const deliveryFee = 50; // Fixed campus delivery/service fee (Rs. 50)

  // Load state from AsyncStorage on app launch
  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const [storedUser, storedCart, storedOrders] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.USER),
        AsyncStorage.getItem(STORAGE_KEYS.CART),
        AsyncStorage.getItem(STORAGE_KEYS.ORDERS),
      ]);

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedOrders) setOrders(JSON.parse(storedOrders));
    } catch (error) {
      console.error('Failed to load data from AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  // User authentication actions
  const loginUser = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(userData));
    } catch (error) {
      console.error('Failed to save user:', error);
    }
  };

  const logoutUser = async () => {
    try {
      setUser(null);
      setCart([]);
      await AsyncStorage.multiRemove([STORAGE_KEYS.USER, STORAGE_KEYS.CART]);
    } catch (error) {
      console.error('Failed to logout user:', error);
    }
  };

  // Save cart helper
  const saveCart = async (newCart) => {
    try {
      setCart(newCart);
      await AsyncStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(newCart));
    } catch (error) {
      console.error('Failed to save cart:', error);
    }
  };

  // Save orders helper
  const saveOrders = async (newOrders) => {
    try {
      setOrders(newOrders);
      await AsyncStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(newOrders));
    } catch (error) {
      console.error('Failed to save orders:', error);
    }
  };

  // Cart operations
  const addToCart = (menuItem, quantity = 1, instructions = '') => {
    const existingIndex = cart.findIndex((i) => i.item.id === menuItem.id);
    let updatedCart = [];

    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + quantity,
        instructions: instructions || updatedCart[existingIndex].instructions,
      };
    } else {
      updatedCart = [
        ...cart,
        {
          id: menuItem.id,
          item: menuItem,
          quantity,
          instructions,
        },
      ];
    }
    saveCart(updatedCart);
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cart.filter((i) => i.item.id !== itemId);
    saveCart(updatedCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    const updatedCart = cart.map((i) =>
      i.item.id === itemId ? { ...i, quantity: newQuantity } : i
    );
    saveCart(updatedCart);
  };

  const clearCart = () => {
    saveCart([]);
  };

  const getCartCount = () => {
    return cart.reduce((sum, i) => sum + i.quantity, 0);
  };

  const getCartSubtotal = () => {
    return cart.reduce((sum, i) => sum + i.item.price * i.quantity, 0);
  };

  const getCartTotal = () => {
    const subtotal = getCartSubtotal();
    return subtotal > 0 ? subtotal + deliveryFee : 0;
  };

  // Order operations
  const placeOrder = (details = {}) => {
    const subtotal = getCartSubtotal();
    const total = subtotal + deliveryFee;

    const orderId = 'QB' + Date.now().toString().slice(-6);

    const newOrder = {
      id: orderId,
      items: [...cart],
      subtotal,
      deliveryFee,
      total,
      date: new Date().toLocaleString(),
      status: 'Placed', // Options: 'Placed', 'Preparing', 'Ready for pickup'
      pickupTime: '15-20 min',
      location: details.location || 'Main Canteen Counter',
      paymentMethod: details.paymentMethod || 'Cash on Pickup',
      user: user || { name: 'Guest Student', studentId: 'GUEST' },
    };

    const updatedOrders = [newOrder, ...orders];
    saveOrders(updatedOrders);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map((ord) =>
      ord.id === orderId ? { ...ord, status: newStatus } : ord
    );
    saveOrders(updatedOrders);
  };

  return (
    <CartContext.Provider
      value={{
        user,
        cart,
        orders,
        deliveryFee,
        loading,
        loginUser,
        logoutUser,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartCount,
        getCartSubtotal,
        getCartTotal,
        placeOrder,
        updateOrderStatus,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
