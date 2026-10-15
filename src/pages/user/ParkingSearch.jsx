import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import ParkingCard from "../../components/parking/ParkingCard";
import ParkingSearchBar from "../../components/parking/ParkingSearchBar";

const initialParkingData = [
  {
    id: 1,
    name: "Smart Parking A",
    location: "Unit 4, Bhubaneswar",
    total: 100,
    available: 42,
    carSlots: 25,
    bikeSlots: 17,
  },
  {
    id: 2,
    name: "City Parking Hub",
    location: "Saheed Nagar, Bhubaneswar",
    total: 80,
    available: 31,
    carSlots: 18,
    bikeSlots: 13,
  },
  {
    id: 3,
    name: "Central Parking",
    location: "Master Canteen, Bhubaneswar",
    total: 120,
    available: 68,
    carSlots: 40,
    bikeSlots: 28,
  },
  {
    id: 4,
    name: "Airport Executive Parking",
    location: "Biju Patnaik Int'l Airport",
    total: 150,
    available: 84,
    carSlots: 90,
    bikeSlots: 60,
  },
  {
    id: 5,
    name: "Esplanade Mall Parking",
    location: "Rasulgarh, Bhubaneswar",
    total: 200,
    available: 110,
    carSlots: 140,
    bikeSlots: 60,
  },
  {
    id: 6,
    name: "KIIT Square Parking",
    location: "Patia, Bhubaneswar",
    total: 90,
    available: 19,
    carSlots: 50,
    bikeSlots: 40,
  },
];

const ParkingSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleType, setVehicleType] = useState("all");

  const filteredParking = initialParkingData.filter((parking) => {
    const matchesSearch =
      parking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      parking.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (vehicleType === "car") return matchesSearch && parking.carSlots > 0;
    if (vehicleType === "bike") return matchesSearch && parking.bikeSlots > 0;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen text-slate-800">
      <Navbar />

      <div className="pt-20 flex">
        <Sidebar />

        <main className="flex-1 p-6 md:p-10 max-w-7xl">
          <div className="mb-8">
            <p className="text-emerald-700 font-bold text-xs uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 w-fit">
              FIND PARKING
            </p>

            <h1 className="text-4xl font-black text-slate-900 mt-2 tracking-tight">
              Find your parking spot
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Search real-time parking availability across key locations with live sensor updates.
            </p>
          </div>

          <ParkingSearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            vehicleType={vehicleType}
            setVehicleType={setVehicleType}
            onSearch={() => {}}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {filteredParking.map((parking) => (
              <ParkingCard
                key={parking.id}
                parking={parking}
              />
            ))}
          </div>

          {filteredParking.length === 0 && (
            <div className="text-center py-16 bg-white border border-slate-200/80 rounded-3xl mt-8 shadow-xs">
              <p className="text-lg font-bold text-slate-900">No parking spots found</p>
              <p className="text-slate-500 text-sm mt-1">Try searching with a different location term or vehicle filter.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ParkingSearch;
