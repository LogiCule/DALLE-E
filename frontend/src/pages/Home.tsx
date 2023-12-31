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
  if (data?.length > 0)
    return data.map((post) => <Card key={post.id} {...post} />);
  return (
    <h2 className="mt-5 font-bold text-[#6449ff] text-xl uppercase">{title}</h2>
  );
};

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [allPosts, setAllPosts] = useState<PostDataType[]>([]);
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setAllPosts([]);
      setSearchText("");
    }, 1000);
  }, []);

  console.log({ allPosts, searchText });

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
        <FormField />
      </div>

      <div className="mt-10">
        {loading ? (
          <Loader />
        ) : (
          <>
            {searchText && (
              <h2 className="font-medium text-[#666e75] text-xl mb-3">
                Showing Results for{" "}
                <span className="text-[222328]">{searchText}</span>
              </h2>
            )}
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
              {searchText ? (
                <RenderCards data={allPosts} title="No search Results found" />
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
