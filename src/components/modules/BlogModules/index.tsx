import React, { useState, useEffect } from "react";
import { albert } from "@/styles/fonts";

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
    <div className={`${albert.className}blog-container bg-black text-white`}>
      <div className="font-semibold text-4xl text-center md:text-left p-12 pt-40">
        My Blog
      </div>
      <div className="posts-list">
        {posts.map((post) => (
          <div
            key={post.guid}
            className=" text-white flex justify-center items-center"
          >
            <div className="w-full mx-5 p-12 md:w-3/4 md:p-5 rounded-xl shadow-lg shadow-gray-700 bg-black/70 mb-20">
              <div className="text-xl md:text-4xl font-bold mb-4">
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
