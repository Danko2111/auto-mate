"use client";

import CarTile from "@/components/CarTile";
import SkeletonCarTile from "@/components/SkeletonCarTile";
import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewCarModal from "@/components/NewCarModal";

export default function MyCars() {
  const cars = [
    {
      image: null,
      make: "BMW",
      model: "M4",
      year: "2015",
      milage: "67,349",
      lastServiceDate: "Sept 3, 2024",
    },
    {
      image: null,
      make: "BMW",
      model: "M4",
      year: "2015",
      milage: "67,349",
      lastServiceDate: "Sept 3, 2024",
    },
    {
      image: null,
      make: "BMW",
      model: "M4",
      year: "2015",
      milage: "67,349",
      lastServiceDate: "Sept 3, 2024",
    },
    {
      image: null,
      make: "BMW",
      model: "M4",
      year: "2015",
      milage: "67,349",
      lastServiceDate: "Sept 3, 2024",
    },
    {
      image: null,
      make: "BMW",
      model: "M4",
      year: "2015",
      milage: "67,349",
      lastServiceDate: "Sept 3, 2024",
    },
  ];

  const initialState = {
    make: "",
    model: "",
    year: "",
    milage: "",
    notes: [""],
  };

  const [showModal, setShowModal] = useState(false);
  const [myCars, setMyCars] = useState([]);
  const [carInfo, setCarInfo] = useState(initialState);
  const [allModels, setAllModels] = useState([]);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch("/api/get-cars", {
  //         method: "GET",
  //       });
  //       const fetchedData = await res.json();
  //       setMyCars(fetchedData);
  //     } catch (err) {
  //       console.error(err);
  //       toast.error(
  //         "There was an error finding your cars, please try again later"
  //       );
  //     }
  //   };

  //   fetchData();
  // }, []);

  const sortModels = (modelsList) => {
    modelsList.sort((a, b) => {
      // Check if the model starts with a number
      const isANum = /^\d/.test(a);
      const isBNum = /^\d/.test(b);

      // If one starts with a number and the other doesn't, sort numbers first
      if (isANum && !isBNum) return -1;
      if (!isANum && isBNum) return 1;

      // Otherwise, sort alphabetically
      return a.localeCompare(b);
    });
  };

  useEffect(() => {
    if (carInfo.make) {
      //clear fields first
      setCarInfo((prevState) => ({
        ...prevState,
        model: "",
        year: "",
        milage: "",
        notes: [""],
      }));

      const fetchData = async () => {
        try {
          const res = await fetch(
            `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${carInfo.make}?format=json`
          );
          const fetchedData = await res.json();
          const allModels = fetchedData.Results.map((item) => item.Model_Name);
          sortModels(allModels);
          setAllModels(allModels);
        } catch (err) {
          console.error(err);
          toast.error(
            "There was an error fetching car data, please try again later",
            { position: "top-right", hideProgressBar: true }
          );
        }
      };
      fetchData();
    }
  }, [carInfo.make]);

  const addNewCar = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/add-car", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(carInfo),
    });

    if (res.ok) {
      setLoading(false);
      setShowModal(false);
      toast.success("Your new car has been added!");
    } else {
      setLoading(false);
      toast.error("There was an issue adding your car");
      const error = await res.json();
      console.error(error);
    }
  };

  const handleChange = (e, field) => {
    if (field === "milage") {
      if (e.target.value === "") {
        setCarInfo((prevState) => ({ ...prevState, milage: 0 }));
      } else {
        const cleanedMilage = e.target.value.replace(/[^0-9.]/g, "");
        const milage = parseFloat(cleanedMilage).toLocaleString();
        setCarInfo((prevState) => ({ ...prevState, milage: milage }));
      }
    } else {
      setCarInfo((prevState) => ({ ...prevState, [field]: e.target.value }));
    }
  };

  const notesChangeHandler = (e, idx) => {
    const updatedNotes = [...carInfo.notes];
    updatedNotes[idx] = e.target.value;
    setCarInfo((prevState) => ({ ...prevState, notes: updatedNotes }));
  };

  const addNote = () => {
    const updatedNotes = [...carInfo.notes];
    updatedNotes.push("");
    setCarInfo((prevState) => ({ ...prevState, notes: updatedNotes }));
  };

  const showModalHandler = () => {
    setShowModal((prevState) => (prevState === false ? true : false));
  };

  return (
    <div className="max-w-lg-screen-centre mx-auto">
      <div className="flex justify-between">
        <h2 className="font-bold text-primary text-4xl">My Cars</h2>
        <button className="btn btn-sm btn-accent" onClick={showModalHandler}>
          Add Car
          <FiPlus />
        </button>
      </div>
      <div className="mt-8 p-2 pr-4 grid place-items-center mdl:place-items-start md:grid-cols-1 mdl:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 gap-6 overflow-auto max-h-screen-minus-extras">
        {cars.map((car, idx) => (
          <CarTile carInfo={car} key={`car-${idx}`} />
        ))}
        <SkeletonCarTile showModalHandler={showModalHandler} />
      </div>
      <NewCarModal
        showModal={showModal}
        carInfo={carInfo}
        allModels={allModels}
        handleChange={handleChange}
        addNote={addNote}
        notesChangeHandler={notesChangeHandler}
        showModalHandler={showModalHandler}
        addNewCar={addNewCar}
        loading={loading}
      />
      <ToastContainer />
    </div>
  );
}
