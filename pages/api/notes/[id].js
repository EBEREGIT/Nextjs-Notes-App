import Note from "../../../models/Note";
import dbConnect from "../../../utils/dbConnect";

dbConnect();

export default async (req, res) => {
  // extract the method (verb) and id from the endpoint
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    //   retrieve a single note
    case "GET":
      try {
        const note = await Note.findById(id);

        if (!note) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, date: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    //   update a note
    case "PUT":
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!note) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, date: note });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    //   delete a note
    case "DELETE":
      try {
        const deletedNote = await Note.deleteOne({ _id: id });

        if (!deletedNote) {
          return res.status(400).json({ success: false });
        }

        res.status(200).json({ success: true, date: {} });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    //   if no matching method
    default:
      res.status(400).json({ success: false });
      break;
  }
};
