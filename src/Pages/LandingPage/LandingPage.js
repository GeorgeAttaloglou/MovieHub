import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Contexts/authContexts";

import RecentReleases from "../../Components/RecentReleases/RecentReleases";
import PopularMovies from "../../Components/PopularMovies/PopularMovies";
import ComingSoon from "../../Components/ComingSoon/ComingSoon";

import "./LandingPage.css";


const LandingPage = () => {
	const { user } = useAuth();
	const navigate = useNavigate();


	return (

		/* This is the hero section where the user is welcomed and there is a button that scrolls down to the how it works section */
		<div className="landing-page">
			<section className="hero-section">
				<div className="hero-content">
					<h1>Welcome to MovieHub</h1>
					<p>Track your favorite movies, create lists, and discover what’s trending!</p>
					<button className="hero-button" onClick={() => {
						document.getElementById('how-it-works').scrollIntoView({ behavior: 'smooth' });
					}}>
						Get Started
					</button>
				</div>
			</section>

			{/* This is the features section of the site. There are 4 buttons that lead to different pages of the site. */}
			<section className="features-section">
				{[
					{ to: "/browse-movies", emoji: "🎬", title: "Browse Movies", desc: "Find and explore thousands of movies and shows." },
					{ to: "/log", emoji: "⭐", title: "Rate & Review", desc: "Log and review your watched movies." },
					{ to: "/create-list", emoji: "📋", title: "Create Lists", desc: "Build watchlists and favorites easily." },
				].map(({ to, emoji, title, desc }, index) => (
					<Link key={index} to={to} className="feature-link">
						<div className="feature-card">
							<span role="img" aria-label={title}>{emoji}</span>
							<h3>{title}</h3>
							<p>{desc}</p>
						</div>
					</Link>
				))}
				<div
					className="feature-card"
					onClick={() => navigate(user ? "/profilestats" : "/login")}
					style={{ cursor: "pointer" }}
				>
					<span role="img" aria-label="Recommend">🎯</span>
					<h3>Statistics</h3>
					<p>Get a deep dive into your movie watching habits through personalised statistics</p>
				</div>
			</section>

			{/* This is the section that explains how the site works. There are 5 steps that the user should follow to use the site */}
			<section id="how-it-works" className="how-it-works-section">
				<h2 className="section-title">How It Works</h2>
				{[
					{ number: "01", title: "Create an Account", desc: "Sign up in seconds to start tracking your movie journey." },
					{ number: "02", title: "Watch a Movie", desc: "Enjoy your favorite films, whether at home or the cinema." },
					{ number: "03", title: "Log and Review", desc: "Record the movies you watched and optionally write reviews." },
					{ number: "04", title: "Get Recommendations", desc: "Receive tailored movie suggestions based on your activity." },
					{ number: "05", title: "Make Lists", desc: "Organize your favorites into personal watchlists and categories." },
				].map(({ number, title, desc }, index) => (
					<div key={index} className="step">
						<div className="step-number">{number}</div>
						<div className="step-content">
							<h3>{title}</h3>
							<p>{desc}</p>
						</div>
					</div>
				))}
			</section>

			{/* This is the section with the most popular and most recent movies. There are 3 carousel components: PopularMovies, RecentReleases, and ComingSoon */}
			<PopularMovies title="Popular Movies" />

			<RecentReleases title="Recent Releases" />

			<ComingSoon title="Coming Soon" />

		</div>
	);
};

export default LandingPage;
