"use client";

import { BsCarFront } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

export default function SkeletonCarTile({ showModalHandler }) {
  return (
    <button
      onClick={showModalHandler}
      className="card bg-base-200 border-4 border-base-300 w-300px h-275px flex items-center justify-center cursor-pointer transition-scale hover:scale-101"
    >
      <div className="flex gap-2 items-center">
        <BsCarFront className="w-20 h-20 text-neutral" />
        <FaPlus className="w-10 h-10 text-neutral" />
      </div>
      <span className="font-bold text-2xl text-neutral">Add Car</span>
    </button>
  );
}
