import React, { useEffect, useState } from "react";

const UserAvatar = ({ name, onClick }) => {
	const [avatar, setAvatar] = useState("");

	useEffect(() => {
		const nameList = name.split(" ");
		nameList.map(namechar =>
			setAvatar(prevState => prevState + namechar[0].toUpperCase())
		);
	}, [setAvatar, name]);

	return (
		<div className="avatar" onClick={onClick}>
			<h4 className="avatar-name">{avatar}</h4>
		</div>
	);
};

export default UserAvatar;
