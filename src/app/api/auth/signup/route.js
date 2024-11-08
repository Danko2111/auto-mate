import User from "@/lib/mongo/models/User";
import { connectToDatabase } from "@/lib/mongodb";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { username, email, password } = await request.json();

  await connectToDatabase();

  //check if username or email already exists
  const existingEmail = await User.findOne({ email });
  const existingUsername = await User.findOne({ username });

  if (existingEmail && existingUsername) {
    return new Response(
      JSON.stringify({
        message: [
          "This email has already been used",
          "This username has already been used",
        ],
        field: "both",
      }),
      { status: 409 }
    );
  }

  if (existingEmail) {
    return new Response(
      JSON.stringify({
        message: "This email has already been used",
        field: "email",
      }),
      { status: 409 }
    );
  }

  if (existingUsername) {
    return new Response(
      JSON.stringify({
        message: "This username has already been used",
        field: "username",
      }),
      { status: 409 }
    );
  }

  //hash password before saving
  const hashedPassword = await bcrypt.hash(password, 12);

  //create new user
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return new Response("User created successfully", { status: 201 });
}
