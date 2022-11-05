import { Router } from "express";
import { createDonation } from "../controllers/donation";

const router = Router();

router.post("/new", async (req, res, next) => {
  const { user, name, text } = req.body;

  await createDonation({ userId: user, name, text });
  res.status(200).json({
    success: true,
  });
});

export { router as donationsRouter };
