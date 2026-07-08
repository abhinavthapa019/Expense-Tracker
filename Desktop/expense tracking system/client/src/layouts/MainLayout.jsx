import { Outlet } from "react-router-dom";

function MainLayout() {
    return (
        <div>
            <h2>Sidebar</h2>

            <hr />

            <Outlet />
        </div>
    );
}

export default MainLayout;