import React from 'react'
import ReactDOM, {createRoot} from 'react-dom/client'
import App from './App.js'
import './index.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import PracticeScreen from "./Components/PracticeScreen.js";
import RankScreen from "./Components/RankScreen.js";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App/>}>
            <Route path="PracticeScreen" element={<PracticeScreen updateProgress={()=>{}}/>}/>
            <Route path="RankScreen" element={<RankScreen updateProgress={()=>{}}/>}/>
        </Route>
    )
);
const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <RouterProvider router={router}/>
        </React.StrictMode>
    );
}




