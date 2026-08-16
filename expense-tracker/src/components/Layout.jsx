import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="min-vh-100 bg-light">
      <Navbar />

      <main className="container py-4">
        {children}
      </main>
    </div>
  );
}

export default Layout;