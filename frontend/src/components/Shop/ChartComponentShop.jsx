// import Chart from "chart.js/auto";
// import { useEffect } from "react";
// import "chartjs-plugin-datalabels";

// function ChartComponentShop({ arrData, name }) {
//     console.log("arrDataChart", arrData);
//     // biểu đồ
//     const groupedDay = arrData?.reduce((result, order) => {
//         const day = order?.day;
//         const totalData = order?.total;
//         result[day] = (result[day] || 0) + totalData;
//         return result;
//     }, {});
//     const sumData = Object.keys(groupedDay).map((day) => ({
//         day: day,
//         totalData: groupedDay[day],
//     }));
//     console.log("sumData", sumData);
//     useEffect(() => {
//         const reversedLabels = sumData?.map((row) => row.day).reverse();

//         new Chart(document.getElementById("revenueChart"), {
//             type: "line",
//             data: {
//                 labels: reversedLabels,
//                 datasets: [
//                     {
//                         label: name,
//                         data: sumData?.map((row) => row.totalData).reverse(),
//                     },
//                 ],
//             },
//             options: {
//                 plugins: {
//                     datalabels: {
//                         display: true,
//                         color: "white",
//                         font: {
//                             weight: "red",
//                         },
//                     },
//                 },
//             },
//         });
//     }, [arrData]);
//     return (
//         <>
//             <h1>Biểu đồ thống kê {name}</h1>
//             <div style={{ width: "800px" }}>
//                 <canvas id="revenueChart"></canvas>
//             </div>
//         </>
//     );
// }

// export default ChartComponentShop;



// // import Chart from "chart.js/auto";
// // import { useEffect } from "react";
// // import "chartjs-plugin-datalabels";

// // function ChartComponentShop({ arrData, name, valStartDay, valEndDay }) {
// //     console.log("arrDataChart", arrData);

// //     // Biểu đồ
// //     const groupedDay = arrData?.reduce((result, order) => {
// //         const day = order?.day;
// //         const totalData = order?.total;
// //         result[day] = (result[day] || 0) + totalData;
// //         return result;
// //     }, {});

// //     const sumData = Object.keys(groupedDay).map((day) => ({
// //         day: day,
// //         totalData: groupedDay[day],
// //     }));
// //     console.log("sumData", sumData);

// //     useEffect(() => {
// //         const chartData = {
// //             labels: sumData?.map((row) => row.day),
// //             datasets: [
// //                 {
// //                     label: name,
// //                     data: sumData?.map((row) => row.totalData),
// //                     lineTension: 0,
// //                     borderColor: "rgba(75, 192, 192, 1)",
// //                     fill: false,
// //                 },
// //             ],
// //         };

// //         // Đảo ngược trục x nếu có ngày bắt đầu và ngày kết thúc
// //         if (valStartDay && valEndDay) {
// //             const startDate = new Date(valStartDay);
// //             const endDate = new Date(valEndDay);

// //             const dateRange = [];
// //             const currentDate = new Date(startDate);
// //             while (currentDate <= endDate) {
// //                 dateRange.push(currentDate.toISOString().slice(0, 10));
// //                 currentDate.setDate(currentDate.getDate() + 1);
// //             }

// //             chartData.labels = dateRange.reverse(); // Đảo ngược mảng để ngày bắt đầu ở bên trái
// //         }

// //         new Chart(document.getElementById("revenueChart"), {
// //             type: "line",
// //             data: chartData,
// //             options: {
// //                 plugins: {
// //                     datalabels: {
// //                         display: true,
// //                         color: "white",
// //                         font: {
// //                             weight: "bold",
// //                         },
// //                     },
// //                 },
// //                 scales: {
// //                     x: {
// //                         reverse: true, // Đảo ngược trục x để ngày bắt đầu ở bên trái
// //                     },
// //                 },
// //             },
// //         });
// //     }, [arrData, valStartDay, valEndDay]);

// //     return (
// //         <>
// //             <h1>Biểu đồ thống kê {name}</h1>
// //             <div style={{ width: "800px" }}>
// //                 <canvas id="revenueChart"></canvas>
// //             </div>
// //         </>
// //     );
// // }

// // export default ChartComponentShop;

// // import Chart from "chart.js/auto";
// // import { useEffect } from "react";
// // import "chartjs-plugin-datalabels";

// // function ChartComponentShop({ arrData, name }) {
// //     console.log("arrDataChart", arrData);
// //     // biểu đồ
// //     const groupedDay = arrData?.reduce((result, order) => {
// //         const day = order?.day;
// //         const totalData = order?.total;
// //         result[day] = (result[day] || 0) + totalData;
// //         return result;
// //     }, {});
// //     const sumData = Object.keys(groupedDay).map((day) => ({
// //         day: day,
// //         totalData: groupedDay[day],
// //     }));
// //     console.log("sumData", sumData);
// //     useEffect(() => {
// //         new Chart(document.getElementById("acquisitions"), {
// //             type: "bar",
// //             data: {
// //                 labels: sumData?.map((row) => row.day),
// //                 datasets: [
// //                     {
// //                         label: name,
// //                         data: sumData?.map((row) => row.totalData),
// //                     },
// //                 ],
// //             },
// //             options: {
// //                 plugins: {
// //                     datalabels: {
// //                         display: true,
// //                         color: "white",
// //                         font: {
// //                             weight: "bold",
// //                         },
// //                     },
// //                 },
// //             },
// //         });
// //     }, [arrData]);
// //     return (
// //         <>
// //             <h1>Biểu đồ thống kê {name}</h1>
// //             <div style={{ width: "800px" }}>
// //                 <canvas id="acquisitions"></canvas>
// //             </div>
// //         </>
// //     );
// // }

// // export default ChartComponentShop;

import Chart from "chart.js/auto";
import { useEffect } from "react";
import "chartjs-plugin-datalabels";

function ChartComponentShop({ arrData, name }) {
  console.log("arrDataChart", arrData);
  // biểu đồ
  const groupedDay = arrData?.reduce((result, order) => {
    const day = order?.day;
    const totalData = order?.total;
    result[day] = (result[day] || 0) + totalData;
    return result;
  }, {});
  const sumData = Object.keys(groupedDay).map((day) => ({
    day: day,
    totalData: groupedDay[day],
  }));
  console.log("sumData", sumData);
  useEffect(() => {
    new Chart(document.getElementById("acquisitions"), {
      type: "bar",
      data: {
        labels: sumData?.map((row) => row.day),
        datasets: [
          {
            label: name,
            data: sumData?.map((row) => row.totalData),
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            display: true,
            color: "white",
            font: {
              weight: "bold",
            },
          },
        },
      },
    });
  }, [arrData]);
  return (
    <>
      <h1>Biểu đồ thống kê {name}</h1>
      <div style={{ width: "800px" }}>
        <canvas id="acquisitions"></canvas>
      </div>
    </>
  );
}

export default ChartComponentShop;