import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { getAssets } from "../../redux/actions/assetsAction";
import { default as BrokenImage } from "../../assets/svgs/broken-image.svg";
import Sidebar from "../../components/Sidebar";
const Assets = ({ match }) => {
	const dispatch = useDispatch();

	const { assets, loading } = useSelector(state => state.assets);

	useEffect(() => {
		dispatch(getAssets(match.params.id));
	}, [match.params.id, dispatch]);

	return (
		<div className="project">
			<Sidebar id={match.params.id} />
			<div className="project-screen">
				<div className="assets">
					{loading ? (
						<Loader color="primary" />
					) : (
						<div className="assets-container">
							{assets.map(asset => (
								<div className="images">
									<img
										src={asset.data}
										alt={asset.data}
										onError={e => {
											e.target.src = BrokenImage;
											e.target.className += " broken";
										}}
									/>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Assets;
