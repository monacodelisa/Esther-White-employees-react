import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Footer.scss";

const FooterComponent = () => {
	return (
		<div className="footer">
			<div className="details">
				<p>
					created by Esther White
					<a
						className="my-username"
						href="https://esteecodes.com/"
						target="_blank"
						rel="noreferrer"
					>
						&#123;&#123; esteecodes &#125;&#125;
					</a>
				</p>
			</div>
			<div className="social-links">
				<a
					href="https://www.linkedin.com/in/esteecodes/"
					target="_blank"
					rel="noreferrer"
				>
					<FontAwesomeIcon icon="fa-brands fa-linkedin" />
				</a>
				<a
					href="https://github.com/esteecodes"
					target="_blank"
					rel="noreferrer"
				>
					<FontAwesomeIcon icon="fa-brands fa-github" />
				</a>
			</div>
		</div>
	);
};

export default FooterComponent;
