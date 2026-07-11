import Link from "next/link";
import React from "react";
interface ResearchArticleCardProps {
  title: string;
  date: string;
  author: string;
  description: string;
}
const ResearchArticleCard: React.FC<ResearchArticleCardProps> = ({
  title,
  date,
  author,
  description,
}) => {
  return (
    <div>
      <Link href="/vih.rase/issues">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-gray-500">{date}</p>
          <h3 className="text-lg font-semibold">{author}</h3>
          <p className="text-gray-600">{description}</p>
          <span className="text-primary underline">Read the full article</span>
        </div>
      </Link>
    </div>
  );
};

export default ResearchArticleCard;
