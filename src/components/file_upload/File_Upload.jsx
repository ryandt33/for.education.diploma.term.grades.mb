import { useState } from "react";

const File_Upload = ({ setFile }) => {
  const [style, setStyle] = useState({});

  return (
    // create a div with a file input a large area and a dotted border that also allows for files to be drag and dropped on top
    <div className="file-upload-container">
      <input
        style={style}
        type="file"
        id="file"
        className="file-upload"
        onChange={(e) => setFile(e.target.files[0])}
        onDragEnter={() =>
          setStyle({
            border: "2px solid #2F3590",
            borderRadius: "5px",
            padding: "25px",
          })
        }
        onDragLeave={() => setStyle({})}
      />
    </div>
  );
};

export default File_Upload;
