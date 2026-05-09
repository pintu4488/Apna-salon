import "./App.css";
function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row contant-footer">
            <div className="col-4 ">
              <a
                className="footer-profile"
                href="https://res.cloudinary.com/dpvs1afkj/image/upload/q_auto/f_auto/v1777554550/my_img_zpj0du.jpg"
              >
                <img
                  className="footer-img"
                  src="https://res.cloudinary.com/dpvs1afkj/image/upload/q_auto/f_auto/v1777554550/my_img_zpj0du.jpg"
                  alt="Logo"
                />
              </a>
              <h6 style={{ color: "goldenrod" }}>APNA SALON</h6>
              <p style={{ fontSize: "0.5rem", color: "white" }}>
                बेहतरीन स्टाइल और ग्रूमिंग के लिए <br></br>आपका अपना स्थान। हम
                आपको <br></br>एक नया कॉन्फिडेंस देते हैं।
              </p>
            </div>
            <div className="col-4 footer-about">
              <a href="https://www.instagram.com/master.k_r_i_s_h_n_a?igsh=ZHJlaGlsbmIwem1j">
                <img
                  src="https://res.cloudinary.com/dpvs1afkj/image/upload/q_auto/f_auto/v1777560280/instagram_hu8y92.png"
                  alt=""
                  className="intagram"
                />
              </a>
              <a href="https://wa.me/9534049901">
                <img
                  src="https://res.cloudinary.com/dpvs1afkj/image/upload/q_auto/f_auto/v1777560271/whatsapp_kesbbc.png"
                  alt=""
                  className="intagram"
                />
              </a>
            </div>
            <div className="col-4 footer-contact">
              <div style={{ color: "goldenrod" }}>
                <h6>Contact Us</h6>
              </div>
              <div>
                <a style={{textDecoration:"none",fontSize:"0.90rem"}} href="tel:9534049901">📞9534049901</a>
              </div>
              <div>
                <a style={{textDecoration:"none",fontSize:"0.90rem"}} href="tel:8340144406">📞8340144406</a>
              </div>
              <div >
                <a style={{ color: "white",textDecoration:"none"}}href="https://maps.app.goo.gl/yGfLfJvgeTZ4yL3U6">Indira Nagar,Double Transformer</a>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            fontSize: "2vw",
            marginLeft: "30%",
            marginBottom: "0px",
            color: "white",
          }}
        >
          Copyright 2026 Apna Salon.! developed by pintu kumar
        </div>
      </footer>
    </div>
  );
}
export default Footer;
