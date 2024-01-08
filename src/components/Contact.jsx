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
      <form onSubmit={handleSubmit} className="w-3/4 md:w-1/2">
        <div className="grid gap-6">
          <div className="relative z-0">
            <input
              type="text"
              name="name"
              className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-2.5 px-0 text-sm text-white focus:border-accent focus:outline-none focus:ring-0"
              placeholder=" "
              value={formData.name.trim()}
              onChange={handleChange}
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent">
              Your name
            </label>
          </div>

          <div className="relative z-0">
            <input
              type="text"
              name="email"
              className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-2.5 px-0 text-sm text-white focus:border-accent focus:outline-none focus:ring-0"
              placeholder=" "
              value={formData.email.trim()}
              onChange={handleChange}
              // pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
              required={true}
            />
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent">
              * Your email
            </label>
          </div>

          <div className="relative z-0">
            <textarea
              name="body"
              id="body"
              rows="5"
              className="peer block w-full appearance-none border-0 border-b border-white bg-transparent py-2.5 px-0 text-sm text-white focus:border-accent focus:outline-none focus:ring-0"
              placeholder=" "
              value={formData.body}
              onChange={handleChange}
            ></textarea>
            <label className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-white duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:left-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-accent">
              Your message
            </label>
          </div>

          {buttonStatus === "default" ? (
            <button
              type="submit"
              className="mt-5  rounded-md text-black px-10 py-2 bg-accent hover:text-accent hover:bg-black duration-500"
            >
              Send Message
            </button>
          ) : buttonStatus === "sending" ? (
            <button className="mt-5 rounded-md text-accent bg-black duration-500 px-10 py-2">
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 me-3 text-accent animate-spin"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="#E5E7EB"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentColor"
                />
              </svg>
              Sending...
            </button>
          ) : buttonStatus === "sent" ? (
            <span className="mt-5 rounded-md px-10 py-2 text-accent text-center">
              Message Sent!
            </span>
          ) : (
            <span>Error al enviar</span>
          )}
        </div>
      </form>
    </div>
   
  );
}

export default ContactForm;
