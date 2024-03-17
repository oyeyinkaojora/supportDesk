import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { create, createTicket, reset } from "../features/tickets/ticketSlice";
import { BackButton } from "../components/BackButton";

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.ticket
  );
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const dispactch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      navigate("/tickets");
    }

    dispactch(reset());
  }, [dispactch, isError, isSuccess, message, navigate]);

  const onSubmit = (e) => {
    e.preventDefault();

    // if (!product) {
    //   toast.error("Please select a product");
    //   return;
    // }

    dispactch(createTicket({ product, description }));
  };
  return (
    <>
      <BackButton url={"/"} />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the Form Below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            required
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            name="email"
            className="form-control"
            placeholder="Enter your email"
            required
            disabled
          />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product:</label>
            <select
              name="product"
              id="product"
              onChange={(e) => setProduct(e.target.value)}
              value={product}
            >
              <option value="">Select a product</option>
              <option value="Iphone">Iphone</option>
              <option value="Ipad">Ipad</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="Imac">Imac</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Description Of the Issue:</label>
            <textarea
              name="description"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
              placeholder="description"
            ></textarea>
          </div>

          <div className="form-group">
            <button className="btn btn-block" type="submit">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
