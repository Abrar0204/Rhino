import React from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
} from "@material-ui/core";
import { SubjectOutlined, AddCircleOutlineOutlined } from "@material-ui/icons";

const Sidebar = () => {
	const menuItems = [
		{
			text: "My Notes",
			icon: <SubjectOutlined color="secondary" />,
			path: "/",
		},
		{
			text: "Create Note",
			icon: <AddCircleOutlineOutlined color="secondary" />,
			path: "/create",
		},
	];
	return (
		<Drawer anchor="left" variant="permanent">
			<List>
				{menuItems.map(item => (
					<ListItem button key={item.text}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.text} />
					</ListItem>
				))}
			</List>
		</Drawer>
	);
};

export default Sidebar;
