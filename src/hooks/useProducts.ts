import { useEffect, useState } from "react";
import { Product } from "../common/product";

interface EtsyApi {
	results: {
		listing_id: string;
		title: string;
		url: string;
	}[];
}

interface EtsyImagesApi {
	results: {
		images: {
			url_570xN?: string;
		}[];
	}[];
}

const fetchProductImages = async (
	listingIds: string[],
): Promise<Record<string, string> | undefined> => {
	try {
		const getListingImages = await fetch(
			`/.netlify/functions/etsy-listings-images?listingIds=${listingIds.join(",")}`,
		);
		const response = (await getListingImages.json()) as EtsyImagesApi;
		return response.results.reduce(
			(acc, { images }, index) => {
				const listingId = listingIds[index];
				const imageURL = images[0]?.["url_570xN"];
				if (imageURL) {
					acc[listingId] = imageURL;
				}
				return acc;
			},
			{} as Record<string, string>,
		);
	} catch (ex) {
		console.error(ex);
	}
};

export const useProducts = (): { results: Product[]; isLoading: boolean } => {
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		void (async () => {
			try {
				const getProducts = await fetch(
					"/.netlify/functions/etsy-listings",
				);
				const { results }: { results: Product[] } =
					(await getProducts.json()) as EtsyApi;

				if (results.length) {
					// populate images
					const listingIds = results.map(
						({ listing_id }) => listing_id,
					);
					const listingImageMap =
						await fetchProductImages(listingIds);
					if (listingImageMap) {
						results.forEach((product) => {
							product.imageURL =
								listingImageMap[product.listing_id];
						});
					}
				}

				setProducts(results);
			} catch (ex) {
				console.error("Failed to fetch etsy listings");
				setProducts([]);
			}
			setIsLoading(false);
		})();
	}, []);

	return { results: products, isLoading };
};
