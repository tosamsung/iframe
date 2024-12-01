import {  Outlet } from 'react-router-dom';



const ProtectedRoute = () => {


    return <Outlet />; // Render route con nếu hợp lệ
};

export default ProtectedRoute;
