import Car from "@/lib/mongo/models/Car";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET(request) {
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
