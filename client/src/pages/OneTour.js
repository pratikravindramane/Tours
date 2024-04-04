import React, { useState, useEffect } from "react";
import axios from "axios";
import { backendLocation } from "../config";
import { useParams } from "react-router-dom";

const UpdateWinnersPage = () => {
  const [event, setEvents] = useState([]);
  const [selectedWinners, setSelectedWinners] = useState({});
  const [serverError, setServerError] = useState(false);
  const [team, setTeam] = useState([]);
  const params = useParams();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(`${backendLocation}/sports`);
        const teams = await axios.get(
          `${backendLocation}/student//by-event/teams/${params.id}`
        );
        const filtered = data.find((e) => {
          return e._id === params.id;
        });
        if (data?.message) {
          setServerError(data?.message);
        } else {
          setEvents(filtered);
        }
        if (teams?.data?.message) {
          setServerError(teams?.data?.message);
        } else {
          setTeam(teams.data);
        }
      } catch (error) {}
    };
    fetch();
  }, []);

  const handleWinnerChange = (eventId, prize, teamId) => {
    setSelectedWinners((prevWinners) => ({
      ...prevWinners,
      [eventId]: { ...prevWinners[eventId], [prize]: teamId },
    }));
  };

  const handleSubmit = async (eventId) => {
  const token = localStorage.getItem("token");

    try {
      const response = await axios.put(
        `${backendLocation}/teacher/update-result/${eventId}`,
        {
          winners: selectedWinners[eventId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response?.data?.message) {
        setServerError(response?.data?.message);
      } 
      // Optionally, you can show a success message or redirect to another page
    } catch (error) {
      console.error("Error updating winners:", error);
    }
  };

  return (
    <div className="container">
      {serverError && (
        <>
          <div className="error-div">
            <p>{serverError}</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                setServerError(false);
              }}
              className="button border border-dark bg-danger"
            >
              ok
            </button>
          </div>
        </>
      )}
      <h1>Update Winners</h1>

      <div key={event._id}>
        <h2>{event.name}</h2>
        <p>Date: {event.date}</p>
        <p>Venue: {event.venue}</p>
        <p>Number of Participants: {event.numberOfParticipants}</p>
        <form>
          <label htmlFor={`firstWinner_${event._id}`}>First Prize:</label>
          <select
            id={`firstWinner_${event._id}`}
            value={selectedWinners[event._id]?.first || ""}
            onChange={(e) =>
              handleWinnerChange(event._id, "first", e.target.value)
            }
          >
            <option value="">Select team</option>
            {team?.map((team) => (
              <option key={team._id} value={team._id}>
                {team.name}
              </option>
            ))}
          </select>
          <br />
          <label htmlFor={`secondWinner_${event._id}`}>Second Prize:</label>
          <select
            id={`secondWinner_${event._id}`}
            value={selectedWinners[event._id]?.second || ""}
            onChange={(e) =>
              handleWinnerChange(event._id, "second", e.target.value)
            }
          >
            <option value="">Select team</option>
            {/* Filter out the first winner from the options */}
            {team
              ?.filter((team) => team._id !== selectedWinners[event._id]?.first)
              ?.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
          </select>
          <br />
          <label htmlFor={`thirdWinner_${event._id}`}>Third Prize:</label>
          <select
            id={`thirdWinner_${event._id}`}
            value={selectedWinners[event._id]?.third || ""}
            onChange={(e) =>
              handleWinnerChange(event._id, "third", e.target.value)
            }
          >
            <option value="">Select team</option>
            {/* Filter out the first and second winners from the options */}
            {team
              ?.filter(
                (team) =>
                  team._id !== selectedWinners[event._id]?.first &&
                  team._id !== selectedWinners[event._id]?.second
              )
              ?.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
          </select>
          <br />
          <button type="button" onClick={() => handleSubmit(event._id)}>
            Update Winners
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateWinnersPage;
