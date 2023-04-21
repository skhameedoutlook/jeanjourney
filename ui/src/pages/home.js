import axios from "axios";
import React from "react";

export default function Home() {
	const [products, setProducts] = React.useState([]);
	React.useEffect(() => {
		console.log("api call")
		axios.get(process.env.REACT_APP_HOMEPAGE_PRODUCTS_URL).then((response) => {
			console.log(response.data);
			const displayList = response.data.map((item, i) => {
				return (
					<li key={i}>{ item.title }, price: { item.price }{ item.currency }</li>
				)
			});
			console.log(displayList);
			setProducts(displayList);
		}).catch(err => console.log(err));
	}, []);
	return (<div></div>);
	return (
		<div>
			<h3>Jean Journey</h3>
			Top Products
			&nbsp; { products }
		</div>
	);
}
