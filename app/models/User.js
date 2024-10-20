import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, required: true },
    username: { type: String, required: true },
    profilepic: { type: String },
    coverpic: { type: String},
    image: { type: String},
    razorpayid: {type:String},
    razorpaysecret: {type:String},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },   
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;

// Function to save a new user
// const saveUser = async (userData) => {
//     try {
//        const user = new User(userData);
//         await user.save();
//         console.log('User saved successfully:', user);
//     } catch (error) {
//         console.error('Error saving user:', error);
//     }
// };



// const saveUser = async (userData) => {
//     try {
//         console.log(userData);
//         let user = await User.findOne({ email: userData.email });
//         if (user) {
//             // Update existing user
//             user.name = userData.name;
//             user.username = userData.username;
//             user.updatedAt = Date.now();
//         } else {
//             // Create new user
//             user = new User(userData);
//         }
//         await user.save();
//         console.log('User saved successfully:', user);
//     } catch (error) {
//         console.error('Error saving user:', error);
//     }
// };

// saveUser();