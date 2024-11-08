"use client";

import { IoMdClose } from "react-icons/io";
import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";

export default function NewCarModal({
  showModal,
  carInfo,
  allModels,
  handleChange,
  addNote,
  notesChangeHandler,
  showModalHandler,
  addNewCar,
  loading,
}) {
  const carMakes = [
    "Acura",
    "Alfa Romeo",
    "Aston Martin",
    "Audi",
    "Bentley",
    "BMW",
    "Bugatti",
    "Buick",
    "Cadillac",
    "Chevrolet",
    "Chrysler",
    "Dodge",
    "Ferrari",
    "Fiat",
    "Fisker",
    "Ford",
    "Genesis",
    "GMC",
    "Honda",
    "Hyundai",
    "Infiniti",
    "Jaguar",
    "Jeep",
    "Karma",
    "Kia",
    "Lamborghini",
    "Land Rover",
    "Lexus",
    "Lincoln",
    "Lucid",
    "Maserati",
    "Mazda",
    "McLaren",
    "Mercedes-Benz",
    "Mini",
    "Mitsubishi",
    "Morgan",
    "Nissan",
    "Polestar",
    "Porsche",
    "Ram",
    "Rivian",
    "Rolls-Royce",
    "Subaru",
    "Tesla",
    "Toyota",
    "Volkswagen",
    "Volvo",
  ];

  // Generate years from 1900 to the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => currentYear - i
  );

  const [missingData, setMissingData] = useState(true);
  const [formStep, setFormStep] = useState(1);

  useEffect(() => {
    if (carInfo.make && carInfo.model && carInfo.year && carInfo.milage) {
      setMissingData(false);
    } else {
      setMissingData(true);
    }
  }, [carInfo]);

  return (
    <dialog
      className={`absolute top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-65 ${
        showModal ? "block" : "hidden"
      }`}
    >
      <div className="modal-box w-80 scale-100 max-w-fit">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={showModalHandler}
          >
            <IoMdClose className="w-5 h-5" />
          </button>
        </form>

        <h3 className="font-bold text-2xl text-primary mb-4">
          Add a New Vehicle
        </h3>
        <progress
          className="progress progress-success w-full"
          value={formStep === 1 ? 50 : 100}
          max="100"
        ></progress>
        <div className="flex gap-4 overflow-hidden">
          <div
            className={`flex flex-shrink-0 w-full flex-col gap-1 p-2 transition-transform ${
              formStep === 1
                ? "translate-x-0"
                : formStep === 2 && "-translate-x-288px"
            }`}
          >
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Make</span>
              </div>
              <select
                className="select select-bordered w-full max-w-xs"
                value={carInfo.make}
                onChange={(e) => handleChange(e, "make")}
              >
                <option value="" disabled>
                  Select
                </option>
                {carMakes.map((make, idx) => (
                  <option key={`${make}-${idx}`} value={make}>
                    {make}
                  </option>
                ))}
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Model</span>
              </div>
              <select
                className="select select-bordered w-full max-w-xs"
                value={carInfo.model}
                onChange={(e) => handleChange(e, "model")}
              >
                <option value="" disabled>
                  Select
                </option>
                {allModels.length &&
                  allModels.map((model, idx) => (
                    <option key={`${model}-${idx}`} value={model}>
                      {model}
                    </option>
                  ))}
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Year</span>
              </div>
              <select
                className="select select-bordered w-full max-w-xs"
                value={carInfo.year}
                onChange={(e) => handleChange(e, "year")}
              >
                <option value="" disabled>
                  Select
                </option>
                {years.length &&
                  years.map((year) => (
                    <option key={`${year}`} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
            </label>
            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Milage</span>
              </div>
              <input
                type="text"
                step="1"
                placeholder="76,152..."
                className="input input-bordered w-full max-w-xs"
                value={carInfo.milage}
                onChange={(e) => handleChange(e, "milage")}
              />
            </label>
            <button
              className="btn btn-primary mt-8"
              onClick={() => setFormStep(2)}
            >
              Next <FaArrowRight />
            </button>
          </div>
          {/* PAGE 2 ------------------------------------------------------------- */}
          <div
            className={`flex w-full flex-shrink-0 flex-col gap-3 transition-transform mt-4 ${
              formStep === 1
                ? "translate-x-0"
                : formStep === 2 && "-translate-x-288px"
            }`}
          >
            <button className="btn btn-xs w-fit" onClick={() => setFormStep(1)}>
              <FaArrowLeft />
              Back
            </button>
            <p className="text-base-content text-sm">{`You can add bullet point notes about the car below (Optional)`}</p>
            <div className="flex flex-col gap-3 p-2 pl-0 max-h-60 overflow-auto">
              {carInfo.notes.map((note, idx) => (
                <label
                  className="form-control w-full max-w-xs"
                  key={`note-${idx}`}
                >
                  <div className="label">
                    <span className="label-text">Note</span>
                  </div>
                  <textarea
                    type="text"
                    placeholder="New Note..."
                    maxLength={150}
                    className="textarea textarea-bordered w-full max-w-xs max-h-64 overflow-hidden shrink-0"
                    value={note}
                    onChange={(e) => notesChangeHandler(e, idx)}
                  />
                </label>
              ))}
            </div>
            <button
              className="btn btn-xs btn-secondary w-fit"
              onClick={addNote}
            >
              Add Note <FaPlus className="w-3 h-3" />
            </button>
            <button
              className={`btn btn-primary w-full mt-auto ${
                missingData ? "btn-disabled" : ""
              }`}
              onClick={addNewCar}
            >
              {loading ? (
                <span className="loading loading-spinner">Loading</span>
              ) : (
                "Add Car"
              )}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}
