import Note from "../../../models/Note";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    //   view all notes
    case "GET":
      try {
        const notes = await Note.find({});

        res.status(200).json({ success: true, date: notes });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    //   create a note
    case "POST":
      try {
        const note = await Note.create(req.body);

        res.status(201).json({ success: true, data: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break

    //   return if no matching verb
    default:
      res.status(400).json({ success: false });
      break;
  }
};
