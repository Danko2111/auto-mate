import User from "@/app/lib/mongo/models/User";
import { connectToDatabase } from "@/app/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { name, email, password } = await request.json();

  await connectToDatabase();

  //check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response("User already exists", { status: 409 });
  }

  //has password before saving
  const hashedPassword = await bcrypt.hash(password, 12);

  //create new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return new Response("User created successfully", { status: 201 });
}
