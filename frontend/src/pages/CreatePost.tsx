import { Preview } from "../assets";
import { getRandomPrompts } from "../utils";
import { Loader, FormField } from "../components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FormDataType } from "../types";

const CreatePost = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<FormDataType>({
    name: "",
    prompt: "",
    photo: "",
  });

  const [generatingImg, setGeneratingImg] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = () => {};

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => {
      return { ...prev, [event.target.name]: event.target.value };
    });
  };

  const handleSurpriseMe = () => {
    setForm((prev) => {
      return { ...prev, prompt: getRandomPrompts() };
    });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);
        const resp = await fetch("http://localhost:8080/api/v1/dalle", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: form.prompt }),
        });
        const data = await resp.json();
        if (data.photo)
          setForm((prev) => {
            return { ...prev, photo: data.photo };
          });
        setTimeout(() => setGeneratingImg(false), 1500);
      } catch (error) {
        setGeneratingImg(false);
        console.log({ error });
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">Create</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">
          Create imaginative and visually stunning images generated by DALL-E AI
        </p>
      </div>

      <form className="mt-16 max-2-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="LogiCule"
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="teddy bears shopping for groceries in Japan, ukiyo-e"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.photo}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={Preview}
                alt={"preview"}
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className="text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? "Generating..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            Once you have created the image you want, you can share it with
            others in the community
          </p>

          <button
            type="submit"
            className="mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? "Sharing..." : "Share with the community"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;
