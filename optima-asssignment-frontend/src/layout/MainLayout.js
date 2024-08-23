import NavBar from "../app/components/NavBar";
import ReactFooter from "../app/components/ReactFooter";

function MainLayout({ children }) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <ReactFooter />
    </div>
  );
}

export default MainLayout;
