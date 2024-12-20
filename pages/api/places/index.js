import dbConnect from "@/db/connect";
import Place from "@/db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  try {
    if (request.method === "GET") {
      const places = await Place.find();
      console.log("Places: ", places);
      response.status(200).json(places);
      return;
    }

    if (request.method === "POST") {
      const placeData = request.body;
      await Place.create(placeData);
      response.status(201).json({ status: "Place created!" });
      return;
    }
  } catch (error) {
    console.log(error);
    response.status(500).json({ status: "Oops, something went wrong" });
  }
  response.status(405).json({ status: "Method not allowed." });
}
