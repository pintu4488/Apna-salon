import "./App.css";
function Header() {
  return (
    <>
      <header className="header ">
       <div className="container-fluid h-100 w-100 g-0 p-0" style={{border:"2px solid black"}}>
        <div className="row h-100 w-100 g-0 p-0" style={{border:"2px solid blue",width: "100vw",
    display:"flex",justifyContent:"center",alignItems:""}}>
          <div className="col-12 h-100 w-100 g-0 p-0 contant" style={{border:"2px solid red"}}>
             <img src="/img-header.jpeg" alt="Log" className="header-img" />
          </div>
        </div>
       </div>
      </header>
    </>
  );
}
export default Header;