import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { auth } from "./components/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/Login";
import RelatedDetails from "./components/RelatedDetails";
import ProductDetails from "./components/ProductDetails";

function App() {
  const [user] = useAuthState(auth);
  return (
    <Router>
      <Routes>
        {user ? (
          <Route path="/" element={<ProductDetails />} />
        ) : (
          <Route path="/" element={<Login />} />
        )}
        {user && (
          <Route path="/details/:productId" element={<RelatedDetails />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
