import Feed from "./components/Feed";
import Navbar from "./components/Navbar";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar"
import "./Home.css";


function Home() {
    return (
        <>
            <Navbar />
            <div className="home-layout">
                <div className="page-grid">

                    <div className="left-sidebar-section">
                        <LeftSidebar />
                    </div>

                    <div className="feed-section">

                        <Feed />
                    </div>

                    <div className="right-sidebar-section">
                        <RightSidebar />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
