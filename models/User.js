import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  avatarUrl: String,
  googleId: Number,
  githubId: Number,
  facebookId: Number,
  comments: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Comment"
    }
  ],
  videos: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Video"
    }
],
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User",UserSchema);

export default model;