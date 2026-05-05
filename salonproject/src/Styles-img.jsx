import { Link } from "react-router-dom";
import "./App.css";
export default function Style() {
  return (
    <div className="container-fluid g-0 p-0">
      <div className="row row-conte g-0 p-0">
        <div className="col-4 book-btn">
         <Link style={{textDecoration:"none",color:"black"}} to="/book-now"> <img src="/booking.png" alt="bookinForm" className="book-now" />
          BOOK NOW</Link>
        </div>
        <div className="col-4 style-ser">
          <Link style={{textDecoration:"none",color:"black"}} to="/Imgbox"><img src="/man-hair.png" alt="hairPhoto" className="man-hair" />
          STYLE</Link>
        </div>
        <div className="col-4 servise-salon">
          <Link style={{textDecoration:"none",color:"black"}} to={"/Services"}><img src="/delivery-man.png" alt="sevices" className="serves" />
          OUR SERVICE</Link>
        </div>
      </div>
    </div>
  );
}
