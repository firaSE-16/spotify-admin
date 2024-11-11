import React, { useEffect, useState } from "react";
import { url } from "../App";
import { toast } from "react-toastify";
import axios from "axios";

const ListAlbum = () => {
  const [data, setData] = useState([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      if (response.data.success) {
        setData(response.data.albums); // corrected "ablums" to "albums"
      }
    } catch (error) {
      toast.error("An error occurred while fetching albums.");
    }
  };

  const removeAlbums = async (id) => {

    try{
      const response = await axios.get(`${url}/api/album/remove`,(id));

      if(response.data.success) {
        toast.success(response.data.message);
        await fetchAlbums(); 
      }

    } catch(error){ 
      toast.error("Error occure")

    }

  }

  useEffect(() => {
    fetchAlbums(); // corrected to call the function
  }, []);

  return (
    <div>
      <p>All Albums List</p>
      <br />
      <div>
        <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Album Colour</b>
          <b>Action</b>
        </div>
        {data &&
          data.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
            >
              <img className="w-12" src={item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.desc}</p>
              <input type="color" value={item.bgColour} readOnly />
              <p onClick={()=>removeAlbums(item._id)} className="cursor-pointer">x</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListAlbum;
