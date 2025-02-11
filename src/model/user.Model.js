const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = mongoose.Schema(
  {
    sFirstName: String,
    slastName: String,
    sEmail: String,
    sPassword: String,
    // nPhoneNumber: String,
    sProfileIamge: String,
    sUserRole: {
      type: String,
      enum: ["Admin", "User"],
      default: "User"
    },
    sResetToken: String, // Token for password reset
    dResetTokenExpires: Date, // Expiry time for the token
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", async function (next) {
  if (this.sPassword) {
    this.sPassword = await bcrypt.hash(this.sPassword, 8);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
