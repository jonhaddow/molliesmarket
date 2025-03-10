import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { ReactElement } from "react";

export interface Item {
	title: string;
	url: string;
	image?: {
		childImageSharp: {
			gatsbyImageData: IGatsbyImageData;
		};
	};
	imageURL?: string;
	date?: string;
}

const ListItem = (props: Item): ReactElement => {
	const { title, date, url, image } = props;

	return (
		<li className="m-auto py-4 md:p-4 h-96 w-full transform-gpu transition-transform hover:scale-105 grid overflow-hidden">
			{image?.childImageSharp.gatsbyImageData && (
				<div className="row-start-1 col-start-1 bg-gradient-to-r from-black/50 to-black/50">
					<GatsbyImage
						image={image.childImageSharp.gatsbyImageData}
						alt=""
						className="-z-10 h-full"
					/>
				</div>
			)}
			<Link
				className="row-start-1 col-start-1 flex flex-col justify-center p-4 w-full items-center text-center text-white h-full focus:outline-black"
				to={url}
			>
				<span className="text-2xl">{title}</span>
				{date && <time className="font-thin pt-4">{date}</time>}
			</Link>
		</li>
	);
};

export const ExternalListItem = (props: Item): ReactElement => {
	const { title, date, url, imageURL } = props;

	return (
		<li className="m-auto py-4 md:p-4 h-96 w-full transform-gpu transition-transform hover:scale-105">
			<div
				style={{
					backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${
						imageURL ?? ""
					})`,
				}}
				className="bg-cover bg-center h-full"
			>
				<a
					className="flex flex-col justify-center p-4 w-full items-center text-center text-white h-full focus:outline-black"
					href={url}
				>
					<span className="text-2xl">{title}</span>
					{date && <time className="font-thin pt-4">{date}</time>}
				</a>
			</div>
		</li>
	);
};

export const PostList = ({ items }: { items: Item[] }): ReactElement => {
	return (
		<ul className="mt-6 grid lg:grid-cols-2 xl:grid-cols-3 md:mx-12">
			{items.map((item) => {
				return React.createElement(
					item.imageURL ? ExternalListItem : ListItem,
					{ key: item.url, ...item },
				);
			})}
		</ul>
	);
};
