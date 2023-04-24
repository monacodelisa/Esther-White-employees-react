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
						href="https://monacodelisa.com/"
						target="_blank"
						rel="noreferrer"
					>
						&#123;&#123; MonaCodeLisa &#125;&#125;
					</a>
				</p>
			</div>
			<div className="social-links">
				<a
					href="https://www.linkedin.com/in/monacodelisa/"
					target="_blank"
					rel="noreferrer"
				>
					<FontAwesomeIcon icon="fa-brands fa-linkedin" />
				</a>
				<a
					href="https://github.com/monacodelisa"
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
