export default {
    port: process.env.PORT || 3000,
    secretyKey: process.env.SECRETYKEY || "0ec32048d50c0ee36d03d42b4ae63de9",    
    publicRoutes: process.env.PUBLICROUTES || [
        'users/create',
        'users/auth',
        'customer/create'
    ]
}