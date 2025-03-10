import format from "pg-format"
import { pool } from ".."

class FileService {
  async upload(files: Express.Multer.File[]) {
    const formatFiles = files.map(
      ({
        fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        filename,
        path,
        size,
      }) => [
        fieldname,
        originalname,
        encoding,
        mimetype,
        destination,
        filename,
        path,
        size,
      ],
    )

    const queryText = `INSERT INTO files (fieldname, originalname, encoding, mimetype, destination, filename, path, size) VALUES %L`
    const query = format(queryText, formatFiles)
    const response = await pool.query(query)
    return response["rows"]
  }
}

export default new FileService()
