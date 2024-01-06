"use client";
import { DarkContext } from "@/Context/Buttontoggle";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect } from "react";
import useSWR from "swr";
import "./globals.css"

const page = () => {

  const {state, dispatch}= useContext(DarkContext)
  console.log(state);
  

  //fetching on client side 
  const fetcher = (...args: Parameters<typeof fetch>) =>
    fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://jsonplaceholder.typicode.com/todos",
    fetcher
  );

  //type of todo

  type toDo = {
    userId: number;
    id: number;
    title: String;
  };
  const router = useRouter();
  const user = localStorage.getItem("userName");
  const userData = user ? JSON.parse(user) : null;

  //whenever user logout its triggered and useEffect run 
  useEffect(() => {
    if (!userData) {
      router.push("login");
    }
    console.log(data);
  }, [userData]);

  function logOut() {
    localStorage.clear();
    router.push("login");
  }

  return (
    <div className=" px-4 min-h-[100vh] " id={state.theme} >
      <div className="flex justify-between items-center h-16  px-3">
        <div>Lama</div>
        <div>
          <div className="flex justify-between gap-5">
            <div className=" flex justify-between items-center border-2 rounded-3xl cursor-pointer px-2 gap-3 relative " onClick={()=> dispatch({type:"CHANGE_THEME"})} >
              <div>🌙</div>
              <div>🔆</div>
              <div className="border rounded-full bg-lime-400 h-[25px] w-[30px] absolute" style={state.theme==="light" ?{left: "2px"}: {right:"2px"} }
              
              >

              </div>
            </div>
          <button
            className=" bg-lime-400 p-2  rounded-xl"
            onClick={logOut}
          >
            Logout
          </button>
            
          </div>
         
        </div>
      </div>
      <div className=" min-w-full flex-wrap  sm:flex sm:flex-wrap sm:gap-3 sm:pt-3 sm:justify-between  sm:px-3 sm:min-h-[100vh] sm:min-w-[100%] ">
        {data?.map((e: toDo) => {
          return (
            <div className=" w-full p-6 border mb-4 rounded-lg flex-shrink-0 sm:w-[30%] sm:px-7 sm:py-8 sm:border sm:rounded-lg " key={e.userId}>
              <p>{e.id}</p>
              <h3>{e.title}</h3>
            </div>
          );
        })}
      </div>
      <div className=" text-center font-extrabold py-8">
        copyright@2024
      </div>
    </div>
  );
};

export default page;
