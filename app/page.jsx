"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const Home = () => {
  const router = useRouter();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api');
        setEvents(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const ToAddEvent = () => {
    router.push("/createpost");
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        onClick={ToAddEvent}
      >
        Add Event
      </button>
      {events.map((event) => (
        <div
          key={event.id}
          className="border border-gray-300 bg-white p-4 my-4 rounded-lg shadow-md"
        >
          <h3 className="text-xl font-semibold">{event.eventName}</h3>
          <p className="text-sm">Date: {event.eventDate}</p>
          <p className="text-sm">Location: {event.eventLocation}</p>
          <p className="text-sm">Price: {event.eventPrice}</p>
          <img src={event.eventImage} alt="Event" className="mt-4" />
        </div>
      ))}
    </div>
  );
};

export default Home;
