import mongoose, { Document, Schema } from "mongoose";
import connectDB from "../db";
import { error } from "console";

export interface ITranslation extends Document {
  timestamp: Date;
  fromText: string;
  from: string;
  toText: string;
  to: string;
}

interface IUser extends Document {
  userId: string;
  translations: Array<ITranslation>;
}

const translationSchema = new Schema<ITranslation>({
  timestamp: { type: Date, default: Date.now },
  fromText: String,
  from: String,
  toText: String,
  to: String,
});

const userSchema = new Schema<IUser>({
  userId: String,
  translations: [translationSchema],
});

// Check if the model already exist to prevent overwriting
// Then initialize the user
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

// NOTE:
// Mongoose is SERVER SIDE
// If you try to access from client side, it won't work
export async function addOrUpdateUser(
  userId: string,
  translation: {
    to: string;
    from: string;
    fromText: string;
    toText: string;
  }
  // translation: ITranslation
): Promise<IUser> {
  const filter = { userId: userId };
  const update = {
    $set: { userId: userId },
    $push: { translations: translation },
  };

  // Upsert option ensures to create the document if it doesn't exist
  const option = {
    upsert: true,
    new: true,
    setDefaultsOnInert: true,
  };

  await connectDB();

  try {
    const user: IUser | null = await User.findOneAndUpdate(
      filter,
      update,
      option
    );

    console.log(">>>>> user added or updated", user);
    if (!user) {
      throw new Error("User not found and was not crated!");
    }

    return user;
  } catch (error) {
    console.error("Error adding or updating user", error);
    throw error;
  }
}

export async function getTranslations(
  userId: string
): Promise<Array<ITranslation>> {
  await connectDB();

  try {
    const user: IUser | null = await User.findOne({ userId: userId });
    if (user) {
      console.log(">>>> user found", user);

      user.translations.sort((a: ITranslation, b: ITranslation) => {
        return b.timestamp.getTime() - a.timestamp.getTime();
      });

      // Return translations
      return user.translations;
    } else {
      console.log(`>>>>> user not found | userId: ${userId}`);
      return [];
    }
  } catch (error) {
    console.error("Error getting translations", error);
    throw error;
  }
}

export async function removeTranslation(
  userId: string,
  translationId: string
): Promise<IUser> {
  await connectDB();

  try {
    const user: IUser | null = await User.findOneAndUpdate(
      { userId: userId }, // Find user by userId
      { $pull: { translations: { _id: translationId } } }, // Remove translation by translationId
      { new: true } // Return the updated document
    );

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  } catch (error) {
    console.error("Error removing translation", error);
    throw error;
  }
}
