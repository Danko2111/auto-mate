"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const initialState = {
    username: "",
    email: "",
    password: "",
  };
  const initialErrorState = { emailError: "", usernameError: "" };
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState(initialErrorState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const changeHandler = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(initialErrorState);
    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setLoading(false);
      router.push("/signin");
    } else {
      const error = await res.json();
      setLoading(false);
      if (error.field === "email") {
        setError((prevState) => ({
          ...prevState,
          [`${error.field}Error`]: error.message,
        }));
      } else if (error.field === "username") {
        setError((prevState) => ({
          ...prevState,
          [`${error.field}Error`]: error.message,
        }));
      } else {
        setError({
          emailError: error.message[0],
          usernameError: error.message[1],
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-3 p-5">
      <div>
        <label
          className={`input input-bordered flex items-center gap-2 ${
            error.emailError ? "border-error border-2" : ""
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input
            type="text"
            className="grow text-ellipsis"
            placeholder="Email"
            value={formData.email}
            name="email"
            onChange={changeHandler}
          />
        </label>
        {error.emailError && (
          <span className="text-error font-bold text-sm">
            {error.emailError}
          </span>
        )}
      </div>
      <label
        className={`input input-bordered flex items-center gap-2 ${
          error.usernameError ? "border-error border-2" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
        </svg>
        <input
          type="text"
          className="grow text-ellipsis"
          placeholder="Username"
          value={formData.username}
          name="username"
          onChange={changeHandler}
        />
      </label>
      {error.usernameError && (
        <span className="text-error font-bold text-sm">
          {error.usernameError}
        </span>
      )}
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="text"
          className="grow"
          placeholder="Password"
          value={formData.password}
          name="password"
          onChange={changeHandler}
        />
      </label>
      <button className="btn btn-primary mt-4" type="submit">
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            Loading
          </>
        ) : (
          <>Register</>
        )}
      </button>
    </form>
  );
}