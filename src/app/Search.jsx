"use client";

import service from "@/service/client";
import React from "react";

export default function Search() {
  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const query = formData.get("query");
    const keywords = formData.get("keywords");

    const response = await service.registerQuery({ query, keywords });

    if (!response.success) alert(response.message);

    console.log(response);
  };

  return (
    <div className="bg-gray-100 rounded-xl w-full max-w-7xl mx-auto p-4 space-y-4">
      <h2 className="text-center font-bold text-2xl">Search</h2>
      <form
        onSubmit={submit}
        className="flex gap-3 items-center"
        autoComplete="off"
      >
        <input
          placeholder="Web Development"
          name="query"
          className="w-full rounded-lg px-4 py-2"
        />
        <input
          placeholder="python, javascript"
          name="keywords"
          className="w-full rounded-lg px-4 py-2"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 shrink-0 rounded-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
}
