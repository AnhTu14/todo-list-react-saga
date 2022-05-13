import * as React from "react";
import ListPage from "./pages/ListPage";
import { Route, Routes } from "react-router-dom";
import AddEditPage from "./pages/AddEditPage";
import { useAppDispatch } from "app/hooks";
import { cityActions } from "features/city/citySlice";
import { useEffect } from "react";
export default function Student() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(cityActions.fetchCityList());
  }, [dispatch]);
  return (
    <div>
      <Routes>
        <Route path="" element={<ListPage />}></Route>
        <Route path="/add" element={<AddEditPage />}></Route>
        <Route path="/edit/:studentId" element={<AddEditPage />}></Route>
      </Routes>
    </div>
  );
}
