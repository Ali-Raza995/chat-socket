import User from "../models/users.model.js";

export const getAllUsers = async (req, res , next) => {
    try {
        const loggedInUser = req.user._id;
        const filteredAllUsers = await User.find({ _id :  {$ne : loggedInUser}}).select("-password")

        res.status(200).json(filteredAllUsers)
        
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
        
    }
}