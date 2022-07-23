// use recart js
import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import API_URL from "../../Helpers/API_URL";

const data = [
  {
    name: "Januari",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Februari",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Maret",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "April",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Mei",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Juni",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Juli",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
  {
    name: "Agustus",
    uv: 5000,
    pv: 4500,
    amt: 2500,
  },
  {
    name: "September",
    uv: 4500,
    pv: 4300,
    amt: 2900,
  },
  {
    name: "Oktober",
    uv: 4300,
    pv: 4500,
    amt: 2000,
  },
  {
    name: "November",
    uv: 3000,
    pv: 4600,
    amt: 6100,
  },
  {
    name: "Desember",
    uv: 5090,
    pv: 6700,
    amt: 2100,
  },
];
const data2 = [
  {
    name: "Dibatalkan Otomatis",
    uv: 4000,

    amt: 2400,
  },
  {
    name: "Ditolak Apotik",
    uv: 3000,

    amt: 2210,
  },
  {
    name: "Permintaan Pembeli",
    uv: 2000,

    amt: 2290,
  },
];

function Statistics() {
  const [opacity, setOpacity] = useState({
    uv: 1,
    pv: 1,
  });

  const handleMouseEnter = useCallback(
    (o) => {
      const { dataKey } = o;

      setOpacity({ ...opacity, [dataKey]: 0.5 });
    },
    [opacity, setOpacity]
  );

  const handleMouseLeave = useCallback(
    (o) => {
      const { dataKey } = o;
      setOpacity({ ...opacity, [dataKey]: 1 });
    },
    [opacity, setOpacity]
  );

  useEffect(() => {}, []);

  return (
    <div className="bg-admin h-full w-full flex">
      <div className=" w-full h-full pt-16 pl-64">
        <div className="py-8 px-12">
          <div className="flex h-8 w-full">
            <div className="w-60 pt-1 text-left mb-2 text-xl text-secondary">
              Ringkasan Statistik
            </div>
            <div className="flex justify-end w-full">
              <div className="w-40 pt-1 text-center rounded-md text-sm">
                <select
                  className="h-full w-full bg-white border border-neutral-gray p2 rounded-md focus:outline-primary cursor-pointer"
                  id=""
                >
                  <option value="">7 Hari Terakhir</option>
                  <option value="">14 Hari Terakhir</option>
                </select>
              </div>
            </div>
          </div>
          <div className="w-full h-8 mb-4 pt-1 text-xs text-gray">
            Update terakhir: 20 Januari 2022, 14.30 WIB
          </div>
          <div className="flex h-32">
            <div className="flex text-center justify-between w-full mb-8 ">
              <div className="w-60 pt-8 rounded-lg shadow-lg bg-white mr-3">
                Pesanan Baru
              </div>
              <div className="w-60 pt-8 rounded-lg shadow-lg bg-white mr-3">
                Siap Dikirim
              </div>
              <div className="w-60 pt-8 rounded-lg shadow-lg bg-white mr-3">
                Sedang Dikirim
              </div>
              <div className="w-60 pt-8 rounded-lg shadow-lg bg-white mr-3">
                Selesai
              </div>
              <div className="w-60 pt-8 rounded-lg shadow-lg bg-white mr-3">
                Dibatalkan
              </div>
              <div className="w-60 pt-8 rounded-lg shadow-lg bg-white">
                Chat Baru
              </div>
            </div>
          </div>
          <div className="h-full w-full rounded-xl shadow-xl bg-white">
            <div className="h-full w-full mb-8">
              <div className="flex justify-between pt-8">
                <div className="w-full flex justify-between">
                  <div className="w-40 h-10 text-center text-lg text-secondary">
                    Penjualan Obat
                  </div>
                  {/* <div className="w-40 h-10 pt-2 text-center ">Filter</div> */}
                  <div className="flex justify-end mr-6 w-full">
                    <div className="w-40 pt-1 text-center rounded-md text-sm">
                      <select
                        className="h-full w-full bg-white border border-neutral-gray p2 rounded-md focus:outline-primary cursor-pointer"
                        id=""
                      >
                        <option value="">Bulanan</option>
                        <option value="">Bulanan</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex">
                <div className="w-full h-full">
                  <LineChart width={1000} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      strokeOpacity={opacity.pv}
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="uv"
                      strokeOpacity={opacity.uv}
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </div>
                <div className="flex flex-col">
                  <div className="h-1/3 w-11/12 pt-12 text-center rounded-lg shadow-lg ml-2">
                    Rata Rata Penjualan Per Bulan
                    <div className="text-2xl">500</div>
                  </div>
                  <div className="h-1/2 w-96 pt-12 text-center"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex ">
            <div className="w-1/2 h-full pt-2 rounded-xl shadow-xl mr-3 bg-white">
              <div className="ml-5 text-xl text-secondary">
                Tren Pendapatan
                <div className="flex justify-end w-full">
                  <div className="w-40 pt-1 text-center rounded-md text-sm mr-7 -mt-7">
                    <select
                      className="h-full w-full bg-white border border-neutral-gray p2 rounded-md focus:outline-primary cursor-pointer"
                      id=""
                    >
                      <option value="">7 Hari Terakhir</option>
                      <option value="">14 Hari Terakhir</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <AreaChart width={650} height={400} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </div>
            </div>
            <div className="w-1/2 h-full pt-2 rounded-xl shadow-xl bg-white">
              <div className="ml-5 text-xl text-secondary">
                Tren Pembatalan
                <div className="flex justify-end w-full">
                  <div className="w-40 pt-1 text-center rounded-md text-sm mr-7 -mt-7">
                    <select
                      className="h-full w-full bg-white border border-neutral-gray p2 rounded-md focus:outline-primary cursor-pointer"
                      id=""
                    >
                      <option value="">Januari</option>
                      <option value="">Februari</option>
                      <option value="">Maret</option>
                      <option value="">April</option>
                      <option value="">Mei</option>
                      <option value="">Juni</option>
                      <option value="">Juli</option>
                      <option value="">Agustus</option>
                      <option value="">September</option>
                      <option value="">Oktober</option>
                      <option value="">November</option>
                      <option value="">Agustus</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-3">
                <AreaChart width={650} height={400} data={data2}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="uv"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </AreaChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;

// use chartjs

// import axios from "axios";
// import React, { useEffect, useState, useCallback } from "react";
// import BarChart from "../components/BarChart";
// import LineChart from "../components/LineChart";
// import { UserData } from "./Data";

// import API_URL from "../../Helpers/API_URL";

// function Statistics() {
//   const [userData, setUserData] = useState({
//     labels: UserData.map((data) => data.year),
//     datasets: [
//       {
//         label: "Users Gained",
//         data: UserData.map((data) => data.userGain),
//         backgroundColor: [
//           "rgba(75,192,192,1)",
//           "#ecf0f1",
//           "#50AF95",
//           "#f3ba2f",
//           "#2a71d0",
//         ],
//         borderColor: "black",
//         borderWidth: 2,
//       },
//     ],
//   });
//   useEffect(() => {}, []);

//   return (
//     <div className="bg-admin h-full w-full flex">
//       <div className=" w-full h-full pt-16 pl-64">
//         <div className="py-8 px-12">
//           <div className="flex h-8 w-full">
//             <div className="w-60 pt-1 text-left mb-2 text-xl text-secondary">
//               Ringkasan Statistik
//             </div>
//             <div className="flex justify-end w-full">
//               <div className="w-40 pt-1 text-center rounded-md text-sm">
//                 <select
//                   className="h-full w-full bg-white border border-neutral-gray p2 rounded-md focus:outline-primary cursor-pointer"
//                   id=""
//                 >
//                   <option value="">7 Hari Terakhir</option>
//                   <option value="">14 Hari Terakhir</option>
//                 </select>
//               </div>
//             </div>
//           </div>
//           <div className="w-full h-8 mb-4 pt-1 text-xs text-gray">
//             Update terakhir: 20 Januari 2022, 14.30 WIB
//           </div>
//           <div className="flex h-32">
//             <div className="flex text-center justify-between w-full mb-8 ">
//               <div className="w-60 pt-8 rounded-lg shadow-lg bg-white mr-3">
//                 Pesanan Baru
//               </div>
//               <div className="w-60 pt-8 rounded-lg shadow-lg bg-white mr-3">
//                 Siap Dikirim
//               </div>
//               <div className="w-60 pt-8 rounded-lg shadow-lg bg-white mr-3">
//                 Sedang Dikirim
//               </div>
//               <div className="w-60 pt-8 rounded-lg shadow-lg bg-white mr-3">
//                 Selesai
//               </div>
//               <div className="w-60 pt-8 rounded-lg shadow-lg bg-white mr-3">
//                 Dibatalkan
//               </div>
//               <div className="w-60 pt-8 rounded-lg shadow-lg bg-white">
//                 Chat Baru
//               </div>
//             </div>
//           </div>
//           <div className="h-full w-full rounded-xl shadow-xl bg-white">
//             <div className="h-full w-full mb-8">
//               <div className="flex justify-between pt-8">
//                 <div className="w-full flex justify-between">
//                   <div className="w-40 h-10 text-center text-lg text-secondary">
//                     Penjualan Obat
//                   </div>
//                   {/* <div className="w-40 h-10 pt-2 text-center ">Filter</div> */}
//                   <div className="flex justify-end mr-6 w-full">
//                     <div className="w-40 pt-1 text-center rounded-md text-sm">
//                       <select
//                         className="h-full w-full bg-white border border-neutral-gray p2 rounded-md focus:outline-primary cursor-pointer"
//                         id=""
//                       >
//                         <option value="">Bulanan</option>
//                         <option value="">Bulanan</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="flex">
//                 <div className="w-full h-full"></div>
//                 <div className="flex flex-col">
//                   <div className="h-1/3 w-11/12 pt-12 text-center rounded-lg shadow-lg ml-2">
//                     Rata Rata Penjualan Per Bulan
//                     <div className="text-2xl">500</div>
//                   </div>
//                   <div className="h-1/2 w-96 pt-12 text-center"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className="flex ">
//             <div className="w-1/2 h-full pt-2 rounded-xl shadow-xl mr-3 bg-white">
//               <div className="ml-5 text-xl text-secondary">
//                 Tren Pendapatan
//                 <div className="flex justify-end w-full">
//                   <div className="w-40 pt-1 text-center rounded-md text-sm mr-7 -mt-7">
//                     <select
//                       className="h-full w-full bg-white border border-neutral-gray p2 rounded-md focus:outline-primary cursor-pointer"
//                       id=""
//                     >
//                       <option value="">7 Hari Terakhir</option>
//                       <option value="">14 Hari Terakhir</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <div style={{ width: 700 }}>
//                   <BarChart chartData={userData} />
//                 </div>
//               </div>
//             </div>
//             <div className="w-1/2 h-full pt-2 rounded-xl shadow-xl bg-white">
//               <div className="ml-5 text-xl text-secondary">
//                 Tren Pembatalan
//                 <div className="flex justify-end w-full">
//                   <div className="w-40 pt-1 text-center rounded-md text-sm mr-7 -mt-7">
//                     <select
//                       className="h-full w-full bg-white border border-neutral-gray p2 rounded-md focus:outline-primary cursor-pointer"
//                       id=""
//                     >
//                       <option value="">Januari</option>
//                       <option value="">Februari</option>
//                       <option value="">Maret</option>
//                       <option value="">April</option>
//                       <option value="">Mei</option>
//                       <option value="">Juni</option>
//                       <option value="">Juli</option>
//                       <option value="">Agustus</option>
//                       <option value="">September</option>
//                       <option value="">Oktober</option>
//                       <option value="">November</option>
//                       <option value="">Agustus</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className="mt-3">
//                 <div style={{ width: 700 }}>
//                   <LineChart chartData={userData} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Statistics;
