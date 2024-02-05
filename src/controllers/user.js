import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );

    const formattedFriends = friends.map(({ _id, firstName, lastName, occupation, location }) => {
      return { _id, firstName, lastName, occupation, location };
    });

    res.status(200).json(formattedFriends);
  } catch (err) {
    console.error("Error fetching user's friends:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((friend) => friend !== friendId);
      friend.friends = friend.friends.filter((friend) => friend !== id);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }

    await user.save();
    await friend.save();

    const updatedUser = await User.findById(id);
    const formattedFriends = updatedUser.friends.map(({ _id, firstName, lastName, occupation, location }) => {
      return { _id, firstName, lastName, occupation, location };
    });

    res.status(200).json(formattedFriends);
  } catch (err) {
    console.error("Error adding/removing friend:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
