import React from "react";
import "./App.css";

const services = [
  { name: "Hair Cut", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914714/file_00000000d33c71fa9c01a4f0b7457876_3_gbzwek.png" },
  { name: "Hair Styling", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/q_auto/f_auto/v1777913869/file_00000000d33c71fa9c01a4f0b7457876_nokdju.png" },
  { name: "Hair Wash", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914715/file_00000000d33c71fa9c01a4f0b7457876_2_yb8tqe.png" },
  { name: "Hair Color", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914713/file_00000000d33c71fa9c01a4f0b7457876_x4dzeg.png" },
  { name: "Beard Trim", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914715/file_00000000d33c71fa9c01a4f0b7457876_4_krmjal.png" },
  { name: "Beard Styling", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914714/file_00000000d33c71fa9c01a4f0b7457876_7_pyehqu.png" },
  { name: "Beard Color", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914714/file_00000000d33c71fa9c01a4f0b7457876_8_qp1twg.png" },
  { name: "Facial", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914713/file_00000000d33c71fa9c01a4f0b7457876_9_efv44n.png" },
  { name: "Face Cleanup", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914714/file_00000000d33c71fa9c01a4f0b7457876_10_gba207.png" },
  { name: "Face Massage", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914713/file_00000000d33c71fa9c01a4f0b7457876_12_rrguqo.png" },
  { name: "Eyebrow", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914713/file_00000000d33c71fa9c01a4f0b7457876_14_ogz3zl.png" },
   { name: "Threading", img: "https://res.cloudinary.com/dpvs1afkj/image/upload/v1777914713/file_00000000d33c71fa9c01a4f0b7457876_13_dvu9tv.png" }
  
];

function Services() {
  return (
    <div className="container">
      <h1 className="title">Apna Salon Services For Men</h1>

      <div className="grid">
        {services.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.img} alt={item.name} />

            <div className="overlay">
              <h3>{item.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;