
const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const checkUsers = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const users = await User.find({});
        console.log('\n--- REGISTERED USERS ---');
        users.forEach(u => {
            console.log(`ID:       ${u._id}`);
            console.log(`Username: ${u.username}`);
            console.log(`Email:    ${u.email}`);
            console.log(`Password: ${u.password} (Hashed)`);
            console.log('------------------------');
        });

        // Also check properties if you want
        // const Property = require('./models/Property');
        // const props = await Property.find({});
        // console.log('\n--- PROPERTIES ---');
        // console.log(props);

        mongoose.connection.close();
    } catch (err) {
        console.error('Error:', err);
    }
};

checkUsers();
