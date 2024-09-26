import express, { Response, Request } from "express";
import verifyToken from "../middleware/auth";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types";

const router = express.Router();

//api/my-bookings
router.get("/", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotel = await Hotel.find({
      bookings: {
        $elemMatch: { userId: req.userId },
      },
    });
    if (!hotel) res.status(404).json({ message: "No Hotel Found" });
    const results = hotel.map((hotel) => {
      const userbookings = hotel.bookings.filter(
        (booking) => booking.userId === req.userId
      );
      const hotelWithUserBookings:HotelType={
        ...hotel.toObject(),
        bookings:userbookings
      }
      return hotelWithUserBookings
    });
    return res.status(200).send(results);
  } catch (err) {
    console.log(err);
    res.status(404).json({ message: "Enable to fetch Hotels" });
  }
});

export default router;
