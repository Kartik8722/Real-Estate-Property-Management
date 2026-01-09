import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home-container">
            <h1>Welcome to Real Estate Manager</h1>
            <p>Manage your properties efficiently.</p>
            <div className="cta-buttons">
                <Link to="/login" className="btn">Login</Link>
                <Link to="/register" className="btn btn-outline">Register</Link>
            </div>
        </div>
    );
};

export default Home;
