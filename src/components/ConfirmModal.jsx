import React, { useState } from "react";
import { Spacer } from "./Reusble";

const ConfirmModal = (text, setIsModalOpen) => {
  const handleConfirm = () => {
    setIsModalOpen(false);
    return true;
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    return false;
  };
  return (
    <>
      <div className="absolute left-0 top-0 w-screen h-screen bg-white/50 z-40 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-3xl px-4 py-6 flex flex-col items-center gap-5">
          <h2 className="mx-auto text-3xl">{text}</h2>
          <Spacer height={40} />
          <div className=" flex gap-20">
            <button onClick={handleConfirm}>Yes</button>
            <button onClick={handleCloseModal}>No</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmModal;
