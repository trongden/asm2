import { BrowserRouter, Routes, Route } from "react-router-dom";

import ListPage from "./pages/ListPage";
import AddPage from "./pages/AddPage";
import EditPage from "./pages/EditPage";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListPage />} />
        <Route path="/add" element={<AddPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </BrowserRouter>
    // <>
    // <AddPage />
    // <EditPage />
    // <ListPage />
    // </>
  )
}

export default App;
