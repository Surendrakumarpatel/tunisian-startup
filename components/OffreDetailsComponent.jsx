"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
// import { createReservation } from "@/actions/model.actions";
import { useRouter } from "next/navigation";

const OffreDetailsComponent = ({ business }) => {
  const businessData = business;

  const [date, setDate] = useState(null);
  const [formattedDate, setFormattedDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [availableTime, setAvailableTime] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleDateChange = (date) => {
    setDate(date);
    const formatted = date.toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "long",
    });
    setFormattedDate(formatted);

    const selectedDay = businessData.offre.availability.find(
      (day) => dayToIndex[day.day] === date.getDay()
    );
    if (selectedDay && !selectedDay.closed) {
      setAvailableTime({ start: selectedDay.start, end: selectedDay.end });
    } else {
      setAvailableTime({ start: "", end: "" });
    }
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleReserveClick = async () => {
    if (!date || !time) {
      toast.error("Veuillez selectionner une date et une heure");
      return;
    }
    if (!availableTime.start || !availableTime.end) {
      toast.error("Ce jour est ferme");
      return;
    }
    if (time < availableTime.start || time > availableTime.end) {
      toast.error("Heure non disponible");
      return;
    }

    const data = {
      date: formattedDate,
      time,
      businessId: businessData.id,
    };

    console.log(data);
    await createReservation({ data });
    toast.success("Reservation reussie !");
  };

  const dayToIndex = {
    Dimanche: 0,
    Lundi: 1,
    Mardi: 2,
    Mercredi: 3,
    Jeudi: 4,
    Vendredi: 5,
    Samedi: 6,
  };

  function isClosed(dayIndex) {
    return businessData.offre.availability.some(
      (day) => dayToIndex[day.day] === dayIndex && day.closed
    );
  }

  function tileDisabled({ date }) {
    const dayIndex = date.getDay();
    return isClosed(dayIndex);
  }

  if (loading) {
    return (
      <div className="mt-4 container mx-auto">
        <Skeleton height={400} width="100%" />
        <Skeleton count={6} />
      </div>
    );
  }

  return (
    <div className="mt-4 container mx-auto px-4 md:px-8 lg:px-16">
      <figure className="w-full">
        <Image
          width={800}
          height={400}
          className="rounded-lg object-cover w-full h-80"
          src={businessData.photo}
          alt={businessData.title}
        />
      </figure>
      <div className="card-body p-0">
        <h1 className="card-title text-lg sm:text-xl md:text-2xl mt-3">
          {businessData.title}
        </h1>
        <div className="flex flex-col gap-4 mt-3">
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-gray-300 p-1 shadow-md hover:shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b130d5"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-map"
              >
                <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
                <path d="M15 5.764v15" />
                <path d="M9 3.236v15" />
              </svg>
            </button>
            <p className="text-xs uppercase underline font-semibold mt-2">
              {businessData.address}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-2 mb-5">
          <p className="text-neutral-500 font-semibold">A propos</p>
          <p className="text-gray-700">{businessData.description || 'Longue description non disponible'}</p>
          <p className="text-neutral-500 font-semibold">Vous avez</p>
          <p className="text-gray-700">{businessData.offre.compensation || 'Compensation non disponible'}</p>
          <p className="text-neutral-500 font-semibold">En échange vous devez faire</p>
          <p className="text-gray-700">{businessData.offre.exigences || 'Exigences non disponibles'}</p>
        </div>
        <button
          className="btn md:btn-wide w-full border-1 border-black rounded-full btn-primary"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Reserver
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-xl text-center mb-8">
              Reserver votre presence
            </h3>
            <div className="w-full justify-center">
              <div className="flex flex-col justify-center items-center">
                <Calendar
                  className="relative"
                  onChange={handleDateChange}
                  value={date}
                  locale="fr"
                  minDate={new Date()}
                  tileDisabled={tileDisabled}
                  showNeighboringMonth={false}
                  defaultView="month"
                  maxDetail="month"
                  minDetail="month"
                  maxDate={
                    new Date(new Date().setMonth(new Date().getMonth() + 1))
                  }
                />
                {availableTime.start && availableTime.end && (
                  <div className="mt-5">
                    <p>
                      Disponible entre : {availableTime.start} et{" "}
                      {availableTime.end}
                    </p>
                    <input
                      className="border-2 border-black rounded-full p-2 mt-2"
                      type="time"
                      value={time}
                      onChange={handleTimeChange}
                      min={availableTime.start}
                      max={availableTime.end}
                    />
                  </div>
                )}
                <button
                  className="btn border-1 border-black rounded-full btn-wide btn-primary mt-5"
                  onClick={handleReserveClick}
                >
                  Reserver
                </button>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn border-1 border-black rounded-full">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default OffreDetailsComponent;
