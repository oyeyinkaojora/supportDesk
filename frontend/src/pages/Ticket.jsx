import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import { BackButton } from "../components/BackButton";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Ticket = () => {
  const { ticket, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.ticket
  );

  const { ticketId } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    dispatch(getUserTicket(ticketId));
  }, [message, ticketId, isError]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Something Went Wrong</div>;
  }

  return (
    <div className="ticket-page">
      {" "}
      <header className="ticket-header">
        <BackButton url={"/tickets"} />
        <h2>Ticket ID:{ticket._id} </h2>
        <span className={`status status-${ticket.status}`}>
          {ticket.status}
        </span>
        <h3>{new Date(ticket.createdAt).toLocaleString("en-US")}</h3>
        <hr />
        <div className="ticket-desc">
          <h3>Description Of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>{" "}
    </div>
  );
};

export default Ticket;
