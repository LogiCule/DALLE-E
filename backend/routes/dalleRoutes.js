import express from "express";
import * as dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.route("/").get((_, res) => {
  res.send("hello from OpenAI");
});

router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      prompt,
      quality: "standard",
      size: "1024x1024",
    });
    const image = response.data[0].url;
    console.log(response.data[0]);

    res.status(200).json({ photo: image });
  } catch (error) {
    console.log({ error });
    res.status(404).send({ imageFGn: error });
    res.status(500).send(error);
  }
});

export default router;
