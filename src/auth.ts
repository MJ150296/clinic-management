import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "./utils/dbConnect";
import UserModel from "./model/User.model";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        dbConnect();

        try {
          // Find the user by email
          const user = await UserModel.findOne({ email: credentials.email });

          if (!user) {
            throw new Error("Invalid email");
          }

          // Check if the password matches
          const isPasswordValid = await user.matchPassword(
            credentials.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          console.log("user", user);
          

          // Return user object if authentication succeeds
          return user;

          // {
          //   id: user._id,
          //   name: user.name,
          //   email: user.email,
          // };
        } catch (error) {
          throw new Error("Error in signing In.");
        }
      },
    }),
  ],
});
