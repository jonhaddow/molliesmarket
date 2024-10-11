import React from "react";
import { Layout, PostList } from "../components";
import { useProducts } from "../hooks";

export default function Products(): React.ReactElement {
	const { results: products, isLoading } = useProducts();

	const pageTitle = "Products";

	return (
		<Layout pageTitle={pageTitle}>
			{products.length === 0 ? (
				<div className="flex mt-6">
					<p className="m-auto">
						{isLoading ? "Loading..." : "No products"}
					</p>
				</div>
			) : (
				<PostList
					items={products.map(({ title, url, imageURL }) => ({
						title,
						url,
						imageURL,
					}))}
				/>
			)}
		</Layout>
	);
}
