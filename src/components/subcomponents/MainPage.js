import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../stylesheets/MainPage.css";

function MainPage() {
  let [id, setId] = useState(useParams());
  const [formData, setFormData] = useState({
    Titulo: "",
    Resumen: "",
    Planteamiento: "",
    Antecedentes: "",
    Objetivo: "",
    Justificacion: "",
    Hipotesis: "",
    Metodo: "",
    Resultados: "",
    Discusion: "",
    Conclusiones: "",
    Bibliografia: "",
  });

  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async (PID) => {
      try {
        const responsePID = await fetch(`http://localhost:1337/api/projects?PID=${PID}`);
        const data = await responsePID.json();
        setId(data.data[0].id);
      } catch (error) {
        alert("INTERNAL ERROR, RELOAD PAGE");
      }
    };

    fetchData(id);
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const files = e.target.files;
    setImages([...images, ...files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log(images);

    try {
      const response = await fetch(`http://localhost:1337/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData })
      });

      const formData2 = new FormData();
      formData2.append("ref", "api::image.image");
      formData2.append("refid", 1);
      formData2.append("field", "content");
      for (const file of images) {
        formData2.append("files", file);
      }
      
      const imagesResponse = await fetch(`http://localhost:1337/api/upload`, {
        method: "PUT",
        body: formData2
      });

      if (!imagesResponse.ok || !response.ok) {
        throw new Error("Error uploading text or images. Please try again.");
      }else{
        alert("uploading succesful!!")
      }

    } catch (error) {
      alert("Error: " + error.message + ". Please try again.");
    }
  };

  const renderTextAreas = () => {
    return Object.keys(formData).map((key) => {
      if (key !== "imagenes") {
        return (
          <div key={key} className="form-field">
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            <textarea name={key} value={formData[key]} onChange={handleInputChange} />
          </div>
        );
      }
      return null;
    });
  };

  return (
    <div className="main-page">
      <div className="main-container">
        <form onSubmit={handleSubmit} className="custom-form">
          {renderTextAreas()}
          <input type="file" name="imagenes" accept="image/*" multiple onChange={handleImageChange} />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainPage;
