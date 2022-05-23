import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import schema from "../Validations/UserSchema";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
};

const Signup = ({ setShowModal, isSignUp }) => {
  const [values, setValues] = useState(initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleClick = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    console.log(e.target);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitEmail = async (data, e) => {
    e.preventDefault();
    console.log({ values });
    const response = await fetch("http://localhost:3001/send", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ values }),
    })
      .then((res) => res.json())
      .then(() => {
        reset();
      });
  };

  return (
    <div className=" auth-modal flex justify-center m-auto">
      <button
        className="d-flex justify-end  "
        aria-label="Close"
        onClick={handleClick}
        aria-hidden="true"
      >
        &times;
      </button>
      <h1 className="mt-3 mb-3">CREATE ACCOUNT</h1>
      <p className="mt-3 mb-3">By clicking Log In, you agree to our terms.</p>
      <form className="m-auto" onSubmit={handleSubmit(submitEmail)}>
        <input
          {...register("firstName")}
          className="rounded "
          type="text"
          placeholder="firstName"
          name="firstName"
          defaultValue={values.firstName}
          onChange={handleChange}
        />
        <p className="text-red-500">{errors.firstName?.message}</p>

        <input
          {...register("lastName")}
          className="rounded"
          type="text"
          placeholder="lastName"
          defaultValue={values.lastName}
          onChange={handleChange}
        />
        <p className="text-red-500">{errors.lastName?.message}</p>

        <input
          {...register("email")}
          className="rounded"
          type="email"
          placeholder="email"
          required={true}
          onChange={handleChange}
          defaultValue={values.email}
        />
        <p className="text-red-500">{errors.email?.message}</p>
        <input
          {...register("phoneNumber")}
          className="rounded"
          placeholder="phoneNumber"
          onChange={handleChange}
          defaultValue={values.phoneNumber}
        />
        <p className="text-red-500">{errors.phoneNumber?.message}</p>

        <button
          style={{
            background:
              "linear-gradient(45deg, rgb(254, 48, 114), rgb(255, 89, 64))",
          }}
          className="text-white secondary-button mt-4 mb-4"
          type="submit"
          onSubmit={submitEmail}
        >
          Submit
        </button>
      </form>

      <hr />
      <h2 className="mt-4 mb-5">Jones</h2>
    </div>
  );
};
export default Signup;
