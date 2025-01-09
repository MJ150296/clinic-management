import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from "model/User.model.ts";

async function seedSuperAdmin() {
  const hashedPassword = await bcrypt.hash("SuperAdminPassword123!", 10);
  const superAdmin = {
    name: "System SuperAdmin",
    email: "superadmin@enterprise.com",
    password: hashedPassword,
    role: "SuperAdmin",
    status: "active",
  };

  const existingSuperAdmin = await User.findOne({ role: "SuperAdmin" });

  if (!existingSuperAdmin) {
    await UserModel.create(superAdmin);
    console.log("SuperAdmin created successfully.");
  } else {
    console.log("SuperAdmin already exists.");
  }
}

async function run() {
  try {
    // Connect to the database
    await mongoose.connect(
      "mongodb+srv://anitsolutions0707:JXjHQAVozD6TJUEr@cms.zkqci.mongodb.net/?retryWrites=true&w=majority&appName=cms",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // Run the seed function
    await seedSuperAdmin();
  } catch (error) {
    console.error("Error seeding SuperAdmin:", error);
  } finally {
    // Disconnect from the database
    await mongoose.disconnect();
  }
}

// run();
