import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const name =
      new Date().toISOString().replace(/:/g, "_") + "_" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });
export default upload;
