import React from "react";
import Sidebar from "./Sidebar";
import service from "@/service/server";

export default async function Home({ searchParams }) {
  const data = searchParams.document_id
    ? await service.getScrappedData(searchParams.document_id)
    : null;

  if (!data) return <p className="text-center">Please select from sidebar</p>;

  const collections = JSON.parse(data?.data?.collections || "");

  return (
    <div className="block space-y-2">
      {collections?.map((data) => (
        <a
          key={data.url}
          href={data.url}
          target="_blank"
          className="block px-4 py-2 rounded-lg border hover:bg-gray-100 duration-200"
        >
          <h2 className="font-bold text-xl">{data.channel}</h2>
          <p className="text-lg">subscribers: {data.subscribers}</p>
        </a>
      ))}
    </div>
  );
}
