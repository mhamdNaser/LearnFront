import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextsProvider";
import axiosClient from "../axios-client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Profile() {
  const { user } = useStateContext();
  const [useData, setUserData] = useState({});
  const [resultdata, setresultData] = useState([]);
  const arrayFromJson = Object.values(resultdata);

  const data = {
    labels: !arrayFromJson
      ? [null]
      : arrayFromJson.map((ele) => {
          return "Form: " + ele.formExam.id + " - " + ele.formExam.type;
        }),
    datasets: [
      {
        label: "Student Result",
        data: !arrayFromJson
          ? [null]
          : arrayFromJson.map((ele) => {
              return ele.result;
            }),
        backgroundColor: "rgb(216, 0, 50, 0.5)",
        borderColor: "rgb(43, 45, 66)",
        pointBorderColor: "rgb(216, 0, 50, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legent: true,
      title: {
        display: true,
        text: "Student Examing Result",
      },
    },
    scales: {
      y: {
        min: 0,
        max: 9,
      },
    },
  };

  useEffect(() => {
    if (user.id) {
      getUserData();
      getUserResult();
    }
  }, [user.id]);

  const getUserData = async () => {
    await axiosClient
      .get(`/users/${user.id}`)
      .then(({ data }) => {
        setUserData(data);
      })
      .catch(() => {
        console.log("user not found ");
      });
  };

  const getUserResult = async () => {
    await axiosClient
      .get(`/userscoreExam/${user.id}`)
      .then((response) => {
        setresultData(response.data.data);
      })
      .catch(() => {
        console.error("Invalid response data format");
      });
  };

  return (
    <div className="container">
      <div className="d-flex my-5 justify-content-center gap-2">
        <div className="col-lg-3 p-4 border">
          <img src={useData.image} alt="" className="img-thumbnail" />
        </div>
        <div className="col-lg-8 border d-flex align-items-center ps-4">
          <div className="px-1">
            <h6 className="text-dark">Name</h6>
            <h6 className="text-dark">E-mail</h6>
            <h6 className="text-dark">Country</h6>
            <h6 className="text-dark">Role</h6>
            <h6 className="text-dark">Status</h6>
          </div>
          <div className="px-1">
            <h6 className="text-dark"> :</h6>
            <h6 className="text-dark"> :</h6>
            <h6 className="text-dark"> :</h6>
            <h6 className="text-dark"> :</h6>
            <h6 className="text-dark"> :</h6>
          </div>
          <div className="px-1">
            <h6 className="text-secondary">
              {" "}
              {useData.first_name} {useData.last_name}
            </h6>
            <h6 className="text-secondary"> {useData.email}</h6>
            <h6 className="text-secondary"> {useData.country}</h6>
            <h6 className="text-secondary"> {useData.role}</h6>
            <h6 className="text-secondary"> {useData.status}</h6>
          </div>
        </div>
      </div>
      <div className="d-flex my-5 justify-content-center gap-2">
        {resultdata && <Bar data={data} options={options}></Bar>}
      </div>
    </div>
  );
}
