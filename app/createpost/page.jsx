'use client'

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { storage } from "../api/firebase";
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from "uuid";

const App = () => {
  const router = useRouter();

  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventPlace, setEventPlace] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [file, setFile] = useState(null);

  const eventSubmit = async () => {
    if (!eventName || !eventDate || !eventPlace || !eventPrice || !file) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      const imageName = file.name + v4();
      const imageRef = ref(storage, `images/${imageName}`);
      await uploadBytes(imageRef, file);

      const imageUrl = await getDownloadURL(imageRef);
      console.log(imageUrl)

      const eventObject = {
        name: eventName,
        date: eventDate,
        place: eventPlace,
        price: eventPrice,
        file: imageUrl,
      };
      
      const response = await axios.post("/api/addtodb", eventObject);
      console.log(response.data);

      router.push("./");
    } catch (error) {
      console.error("Error submitting event:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <input
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Enter your event's name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
      />
      <input
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Enter event's date"
        value={eventDate}
        onChange={(e) => setEventDate(e.target.value)}
      />
      <input
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Enter event's place"
        value={eventPlace}
        onChange={(e) => setEventPlace(e.target.value)}
      />
      <input
        className="mb-4 p-2 border border-gray-300 rounded"
        placeholder="Price"
        value={eventPrice}
        onChange={(e) => setEventPrice(e.target.value)}
      />
      <input
        className="mb-4 p-2 border border-gray-300 rounded"
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
        onClick={eventSubmit}
      >
        Submit Event
      </button>
    </div>
  );
};

export default App;

