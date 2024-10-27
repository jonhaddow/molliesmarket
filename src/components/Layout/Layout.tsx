import React, { ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Footer, Header, Navigation } from "..";
import { useMetadata } from "../../hooks";

interface LayoutProps {
	children?: JSX.Element[] | JSX.Element;
	pageTitle?: string;
	pageDescription?: string;
}

export const Layout = (props: LayoutProps): ReactElement => {
	const { title, description, tagLine, instagramLink } = useMetadata();
	const { pageDescription, pageTitle } = props;

	// Add analytics to the end of the document
	useEffect(() => {
		const script = document.createElement("script");

		script.setAttribute(
			"src",
			"https://static.cloudflareinsights.com/beacon.min.js",
		);

		script.setAttribute(
			"data-cf-beacon",
			'{"token": "d1cb2bd667b841838c511c8f357b6b26"}',
		);

		document.body.appendChild(script);
	}, []);

	return (
		<>
			<Helmet
				title={`${pageTitle ? `${pageTitle} - ` : ""} ${title}`}
				meta={[
					{
						name: "Description",
						content: pageDescription
							? pageDescription
							: description,
					},
				]}
			/>
			<div className="min-h-screen">
				<Header title={title} description={tagLine} />
				<Navigation />
				<main className="relative">{props.children}</main>
				<Footer title={title} instagramLink={instagramLink} />
			</div>
		</>
	);
};
