import { useState } from "react";


function ContactForm() {
  const ownApiKey = import.meta.env.PUBLIC_SECRET_PASSWORD;
  const PUBLIC_URL_API = import.meta.env.PUBLIC_URL_API

  
  

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    body: "",
  });
  const [buttonStatus, setButtonStatus] = useState("default");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonStatus("sending");
    try {
      const response = await fetch(PUBLIC_URL_API , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ownapikey: ownApiKey,
        },
        body: JSON.stringify({
          email:formData.email,
          subject: `New email from ${formData.name} with email ${formData.email}`,
          html: formData.body,
        }),
      });

      if (!response.ok) {
        setButtonStatus("error");
        throw new Error(`Error: ${response.status}`);
      }
      
      const responseBody = await response.json();
      //   console.log('Respuesta del servidor:', responseBody);
      setButtonStatus("sent");
    } catch (error) {
      console.error("Hubo un error al enviar el formulario:", error);
      setButtonStatus("error");
    }
  };

  return (
    
  
    <div className="flex flex-col min-h-screen items-center justify-center">
    <section className="w-3/4 md:w-1/2 mb-10">
      <h2 className="mb-10 xl:text-7xl text-4xl text-accent font-bold">Contact</h2>
    <p className="text-white serif">
    If you have any questions or would like to discuss a potential project, please don't hesitate to get in touch. I look forward to hearing from you and exploring how we can work together.
</p>

</section>
      
    </div>
   
  );
}

export default ContactForm;
