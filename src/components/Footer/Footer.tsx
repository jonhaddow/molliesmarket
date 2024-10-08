import React, { ReactElement } from "react";
import { Instagram } from "../icons";

interface FooterProps {
	title: string;
	instagramLink: string;
}

export const Footer = (props: FooterProps): ReactElement => {
	const currentDate = new Date();
	const year = currentDate.getFullYear();
	const { title, instagramLink } = props;

	const copyrightMsg = `Copyright © ${year} ${title}`;
	return (
		<footer className="mt-10 py-8 px-16 flex justify-between bg-gray-100">
			<a
				className="flex flex-col justify-center"
				href={instagramLink}
				target="_blank"
				rel="noopener noreferrer"
			>
				<Instagram width="24" height="24" />
			</a>
			<p className="text-xs">{copyrightMsg}</p>
		</footer>
	);
};
