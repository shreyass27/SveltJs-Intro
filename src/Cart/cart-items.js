import { writable } from 'svelte/store';

// Normal Store implementation
// const cartItems = writable([
//     {
//         id: "p30",
//         title: "Test",
//         price: 9.99
//     },
//     {
//         id: "p40",
//         title: "Test",
//         price: 9.99
//     }
// ]);

// export default cartItems;


// Custom Store implementation
function cartItemStore() {
    const cartItems = writable([
        {
            id: "p30",
            title: "Test",
            price: 9.99
        },
        {
            id: "p40",
            title: "Test 2",
            price: 9.99
        }
    ]);

    const addItemToCart = (item) => {
        cartItems.update(items => [
            ...items,
            item
        ]);
    }

    const removeCartItem = (id) => {
        cartItems.update(items => [
            ...items.filter(itm => itm.id !== id)
        ]);
    }

    return {
        subscribe: cartItems.subscribe,
        addItemToCart,
        removeCartItem
    }
}

export default cartItemStore();