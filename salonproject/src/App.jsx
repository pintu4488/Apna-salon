import Header from "./Header.jsx";
import Style from "./Styles-img.jsx";
import Footer from "./footer.jsx";
import SalonForm from "./Bookin-from.jsx";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Imgbox from "./Img-box.jsx";

import Services from "./Our-services.jsx";
import AdminPanel from "./AdminPanel.jsx";
import Usersow from "./wait-greeg-red.jsx";
function App() {
  return (
    <>
      <Header />
             <Usersow/>
           
            
          
      <main>
        <Routes>
          <Route path="/" element={<style/>}></Route>
          
          <Route path="/book-now" element={<SalonForm />}></Route>
          <Route path="/Imgbox" element={<Imgbox />}></Route>
          <Route path="/Services" element={<Services />}></Route>
           <Route path="/admin-secret" element={<AdminPanel />}></Route>
        </Routes>
      </main>
      
      <Footer />
    </>
  );
}
export default App;
