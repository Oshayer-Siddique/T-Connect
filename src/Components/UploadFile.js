import { useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";


const UploadFile = () => {
    const [publicId, setPublicId] = useState("");
    const [cloudName] = useState("hzxyensd5");
    const [uploadPreset] = useState("aoh4fpwm");
  
    const [uwConfig] = useState({
      cloudName,
      uploadPreset
    });
  
    const cld = new Cloudinary({
      cloud: {
        cloudName
      }
    });
  
    const myImage = cld.image(publicId);
  
    return (
      <div className="App">
        <h3>Cloudinary Upload Widget Example</h3>
        <CloudinaryUploadWidget uwConfig={uwConfig} setPublicId={setPublicId} />

        <div style={{ width: "800px" }}>
          <AdvancedImage
            style={{ maxWidth: "100%" }}
            cldImg={myImage}
            plugins={[responsive(), placeholder()]}
          />
        </div>
      </div>
    );
  };
  
  export default UploadFile;