import Car from "@/lib/mongo/models/Car";
import { connectToDatabase } from "@/lib/mongodb";
import { getSession } from "next-auth/react";

export async function POST(request) {
  const session = await getSession({ req: request });

  if (!session) {
    return new Response(
      JSON.stringify({ message: "Unauthorized - User not logged in" }),
      { status: 401 }
    );
  }

  const { make, model, year, milage, notes } = await request.json();

  if (!make || !model || !year || !milage) {
    return Response(
      JSON.stringify({
        message:
          "Make, model, year and milage are required when adding a new car",
      }),
      { status: 400 }
    );
  }

  await connectToDatabase();

  try {
    const newCar = new Car({
      make,
      model,
      year,
      milage,
      notes,
      userId: session.user.id,
    });

    await newCar.save();

    return new Response("Car created successfully", { status: 201 });
  } catch (error) {
    console.error("Error creating car:", error);

    if (error.name === "ValidationError") {
      return new Response("Invalid data provided", { status: 400 });
    } else if (error.name === "MongoNetworkError") {
      return new Response("Database connection error", { status: 503 });
    } else {
      return new Response("An error occurred while creating the car", {
        status: 500,
      });
    }
  }
}
