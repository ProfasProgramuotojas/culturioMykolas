"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// import { v4 } from "uuid";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { storage } from "../api/firebase";

const Yourevents = () => {
  const router = useRouter();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("/api/getyourevents", {
          userId: sessionStorage.getItem("UserId"),
        });
        setEvents(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const response = await axios.post("/api/changeEvent", {  // iš front-end reikia gauti šitą object kaip yra po apačia ir turėtu viskas veikti (☞ﾟヮﾟ)☞
        id: 17,
        eventName: "asdvasda",
        eventDate: '2023.11.23' ,
        eventLocation: "asdcasd",
        eventPrice: 22,
        eventImage:
          "https://firebasestorage.googleapis.com/v0/b/createevent-fd94a.appspot.com/o/images%2Fsports-tools.jpg962f92ad-b267-488e-a580-449c8ccf6690?alt=media&token=0ce1472b-0120-41ee-be60-a9014de7e73a",
        userId: 2,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = axios.post("/api/deleteEvent", {id: 21}) // iš fronto reikia gauti id ir tą postą ištrins
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        onClick={() => {
          router.push("./");
        }}
      >
        Home
      </button>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        onClick={handleSaveChanges}
      >
        Handle Save Changes
      </button>
      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        onClick={handleDelete}
      >
        Handle delete (event id is in the code)
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
          <p className="text-sm">Id: {event.id}</p>
          <img
            src={event.eventImage}
            alt={event.eventName}
            className="w-40 h-40 mt-4 object-cover"
          />
        </div>
      ))}
    </div>
  );
};

export default Yourevents;
