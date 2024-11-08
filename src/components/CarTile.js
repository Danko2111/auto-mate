"use client";

import Image from "next/image";

export default function CarTile({ carInfo }) {
  const { image, make, model, year, milage, lastServiceDate } = carInfo;

  return (
    <div className="card bg-base-300 w-300px h-fit cursor-pointer transition-scale hover:scale-101">
      {image ? (
        <Image src={image} />
      ) : (
        <Image
          src="/fallback-car.png"
          width={300}
          height={143}
          alt="vehicle image"
        />
      )}
      <div className="card-body pt-2 p-6 gap-0 h-fit">
        <h2 className="card-title text-2xl text-base-content font-bold">
          {make} {model}
        </h2>
        <div className="divider my-2 before:bg-primary after:bg-primary"></div>
        <div className="flex justify-between">
          <p className="w-fit rounded-lg flex flex-col flex-grow-0">
            <span className="text-xs w-fit opacity-65">Year</span>
            <span className="font-semibold text-md w-fit">{year}</span>
          </p>
          <p className="w-fit rounded-lg flex flex-col flex-grow-0">
            <span className="text-xs w-fit opacity-65">Milage</span>
            <span className="font-semibold text-md w-fit">{milage}</span>
          </p>
          <p className="w-fit rounded-lg flex flex-col flex-grow-0">
            <span className="text-xs w-fit opacity-65">Last Service Date</span>
            <span className="font-semibold text-md w-fit">
              {lastServiceDate ?? "N/A"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
