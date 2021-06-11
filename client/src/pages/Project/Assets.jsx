import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { getAssets } from "../../redux/actions/assetsAction";
import { default as BrokenImage } from "../../assets/svgs/broken-image.svg";
import Sidebar from "../../components/Sidebar";
import { default as NotFound } from "../../assets/svgs/Not-found.svg";
import { getAllProjects } from "../../redux/actions/projectsActions";
const Assets = ({ match }) => {
	const dispatch = useDispatch();

	const { assets, loading } = useSelector(state => state.assets);

	useEffect(() => {
		dispatch(getAllProjects());
		dispatch(getAssets(match.params.id));
	}, [match.params.id, dispatch]);

	return (
		<div className="project">
			<Sidebar id={match.params.id} />
			<div className="project-screen">
				<div className="assets">
					{loading ? (
						<Loader color="primary" />
					) : assets ? (
						<div className="assets-container">
							{assets.map(asset => (
								<div className="images">
									<img
										key={asset.data}
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
					) : (
						<div className="bookmark-not-found ">
							<img
								src={NotFound}
								className="icon"
								alt="Not Found"
								onError={e => (e.target.src = NotFound)}
							/>
							Please install our chrome extension to make use of
							this feature
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Assets;
