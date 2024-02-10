import { useEffect, useState } from "react";
import { Card, FormField, Loader } from "../components";
import { PostDataType } from "../types";

const RenderCards = ({
  data,
  title,
}: {
  data: PostDataType[];
  title: string;
}) => {
  if (data?.length > 0) return data.map((post) => <Card {...post} />);
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allPosts, setAllPosts] = useState<PostDataType[]>([]);
  const [filerPosts, setFilterPosts] = useState<PostDataType[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setFilterPosts(
      allPosts?.filter((post) =>
        post.prompt.toLowerCase().includes(searchText.trim())
      )
    );
  }, [allPosts, searchText]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          "https://dalle-noyy.onrender.com/api/v1/post",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (resp.ok) {
          const json = await resp.json();
          setAllPosts(json.data.reverse());
        }
      } catch (error) {
        console.log({ error });
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section>
      <div>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          The Community Showcase
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w[500px]">
          Browse through a collection of imaginative and visually stunning
          images generated by DALL-E AI
        </p>
      </div>

      <div className="mt-16">
        <FormField
          type="text"
          name="text"
          placeholder="Search Posts"
          value={searchText}
          handleChange={(e) => setSearchText(e.target.value.toLowerCase())}
        />
      </div>

      <div className="mt-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Results for &nbsp;
                <span className="text-[222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards
                  data={filerPosts}
                  title="No search Results found"
                />
              ) : (
                <RenderCards data={allPosts} title="No Posts found" />
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Home;
