import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTickets, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import TicketItem from "../components/TicketItem";

const Tickets = () => {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.ticket
  );

  const dispactch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispactch(reset());
      }
    };
  }, [dispactch, isSuccess]);

  useEffect(() => {
    dispactch(getUserTickets());
  }, [dispactch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url={"/"} />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
          <div>Date</div>
          <div>Product</div>
          <div>Status</div>
          <div></div>
        </div>
        {tickets
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((ticket) => (
            <TicketItem key={ticket._id} ticket={ticket} />
          ))}
      </div>
    </>
  );
};

export default Tickets;
