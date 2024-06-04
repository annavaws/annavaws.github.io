import React, { useState, useEffect } from "react";
import { albert, poppins } from "@/styles/fonts";

interface BlogPost {
  title: string;
  link: string;
  guid: string;
  pubDate: string;
  content: string;
  thumbnail: string;
}

interface BlogApiResponse {
  status: string;
  feed: any;
  items: BlogPost[];
}

const BlogPosts = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@annavaws"
        );
        const data: BlogApiResponse = await response.json();
        if (data.status === "ok") {
          console.log(data);
          setPosts(data.items);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div
      className={`${albert.className} blog-container bg-black text-white galaxy-background`}
    >
      <div className="font-semibold text-4xl text-center md:text-left p-8 pt-40 mb-10">
        My Blog
      </div>
      <div className="posts-list">
        {posts.map((post) => (
          <div
            key={post.guid}
            className=" text-white flex justify-center items-center mx-3"
          >
            <div className=" w-full p-12 md:w-2/3 md:p-10 rounded-xl shadow-lg shadow-gray-800 bg-black/50 mb-6 mx-5 md:m-0 md:mb-12">
              <div
                className={`${poppins.className} text-xl md:text-3xl font-bold mb-4`}
              >
                {post.title}
              </div>
              <div className="text-md md:text-xl font-semibold mb-2">
                Published on: {new Date(post.pubDate).toLocaleDateString()}
              </div>
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline hover:underline-offset-2"
              >
                Read more on Medium
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
