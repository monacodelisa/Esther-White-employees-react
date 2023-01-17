import logo from "./logo.svg";
import "./Header.scss";

const HeaderComponent = () => {
	return (
		<div className="header-nav">
			<h1>CSV File Reader and Employee Pair Finder</h1>
			<div className="description">
				<p>in React </p>
				<img src={logo} className="App-logo" alt="" />{" "}
				<p>by Esther White </p>
			</div>
		</div>
	);
};

export default HeaderComponent;
