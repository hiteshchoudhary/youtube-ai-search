"use client";

import service from "@/service/client";
import Link from "next/link";
import React from "react";

export default function Sidebar() {
  const [fetchCount, setFetchCount] = React.useState(0);
  const [list, setList] = React.useState(null);

  React.useEffect(() => {
    service.getQueryList().then((res) => {
      if (!res.success) alert(res.message);

      setList(() => res.data.documents);
    });
  }, [fetchCount]);

  if (!list) return "loading...";

  return (
    <div className="block w-full space-y-2">
      <button
        className="bg-blue-500 text-sm px-2 text-white rounded-md"
        onClick={() => {
          setList(() => null);
          setFetchCount((c) => c + 1);
        }}
      >
        Refresh list
      </button>
      {list.map((document) => (
        <Link
          key={document.$id}
          className="block px-4 py-2 rounded-lg border hover:bg-gray-100 duration-200"
          href={`/?document_id=${document.$id}`}
        >
          {document.query}
        </Link>
      ))}
    </div>
  );
}
