import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../stylesheets/MainPage.css";

function MainPage() {
  let { id } = useParams();
  let [gid, setGID] = useState();
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


  useEffect(() => {
    const fetchData = async (PID) => {
      try {
        const responsePID = await fetch(`https://sci-api.onrender.com/api/projects?filters[PID][$eq]=${PID}&populate=*`);
        const data = await responsePID.json();
        setGID(data.data[0].id);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://sci-api.onrender.com/api/projects/${gid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: formData })
      });

      if (!response.ok) {
        throw new Error("Error subiendo tu proyecto. Asegúrate de haber introducido el identificador correcto.");
      }else{
        alert("Tu proyecto se subió correctamente")
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
          <button type="submit" className="submit-button">
            Subir Proyecto
          </button>
        </form>
      </div>
    </div>
  );
}

export default MainPage;
