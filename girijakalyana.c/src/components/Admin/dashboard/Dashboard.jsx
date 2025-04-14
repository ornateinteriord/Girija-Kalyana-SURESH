import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { Link } from "react-router-dom";
import "./dashboard.scss";
import { getAllUserProfiles } from "../../api/Admin";
import { LoadingComponent } from "../../../App";

// Reusable Card Component
const DashboardCard = ({ count, label, icon, link, style }) => {
  return (
    <div className="main-div-card">
      <div className="left-div">
        <div className="heading-div">
          <h1>{count}</h1>
          <p>{label}</p>
        </div>
        <div className="right-div">{icon}</div>
      </div>
      <div className="view-all-div" style={style}>
        <Link to={link || "#"}>View All</Link>
      </div>
    </div>
  );
};

const Dashboard=() =>{
const {data:users =[],isLoading,isError,error} = getAllUserProfiles()
console.log(users)
const freeUsersCount = users.filter(user => user?.type_of_user?.toLowerCase() === "freeuser").length;
const silverUsersCount = users.filter(user => user?.type_of_user?.toLowerCase() === "silveruser").length;
const premiumUsersCount = users.filter(user => user?.type_of_user?.toLowerCase() === "premiumuser").length;
console.log(freeUsersCount,"free user")
  // Fetch users using async/await
   useEffect(() => {
       if (isError) {
         toast.error(error.message);
       }
     }, [isError, error]);

  // Define iconStyle before it is used
  const iconStyle = { fontSize: "50px", color: "#92d0f3" };

  const stats = [
    { count: freeUsersCount, label: "Free Users", icon: <FaUsers style={iconStyle} /> },
    { count: silverUsersCount, label: "Silver Users", icon: <FaUsers style={iconStyle} /> },
    { count: premiumUsersCount, label: "Premium Users", icon: <FaUsers style={iconStyle} /> },
    { count: 67, label: "Total Paid Users", icon: <FaUsers style={iconStyle} />, link: "/admin/onlinetransaction" },
    { count: 325, label: "Assistance Pending", icon: <FaUsers style={iconStyle} />, link: "/admin/assistencepending" },
    { count: 2, label: "Assistance Success", icon: <FaUsers style={iconStyle} />, link: "/admin/assistencesuccess" },
    { count: 11332.86, label: "Paid User Receipts", icon: <MdCurrencyRupee style={iconStyle} />, link: "/admin/onlinetransaction" },
    { count: 10873.88, label: "Assistance Receipts", icon: <MdCurrencyRupee style={iconStyle} />, link: "/admin/assistanceonlinetransaction" },
    { count: 6646.0, label: "Renewal Receipts", icon: <MdCurrencyRupee style={iconStyle} /> },
    { count: 12951.8, label: "Total Online Receipts", icon: <MdCurrencyRupee style={iconStyle} /> },
  ];

  return (
    <div className="dashboard-content-main">
      {/* Cards Section */}
      <div className="card-div">
        {stats.map((stat, index) => (
          <DashboardCard
            key={index}
            count={stat.count}
            label={stat.label}
            icon={stat.icon}
            link={stat.link}
          />
        ))}
      </div>

      {/* Recent Register Section
      <div className="dash-board-bottom">
        <div className="dash-board-bottom-main">
          <div className="heading-div">
            <p>Recent Register</p>
          </div> */}
          {/* <div className="list-div">
            <p>Registration No</p>
            <p>Name</p>
            <p>Email</p>
            <p>Phone</p>
          </div>
          <div className="data-fetching">
            {error ? (
              <div className="error-message">{error}</div>
            ) : (
              <div className="data-div">
                {users.map((user) => (
                  <ul key={user.id}>
                    <li>{user.id}</li>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                    <li>{user.phone}</li>
                  </ul>
                ))}
              </div>
            )}
          </div> */}
        {/* </div> */}
      {/* </div> */}
      {isLoading && <LoadingComponent/>}
    </div>
  );
}

export default Dashboard;
