import React from 'react';
import { connect } from 'react-redux';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SidebarRight from './../sidebar-right/SidebarRight';
import SidebarLeft from './../sidebar-left/SidebarLeft';
import { drawerToggle } from './../../redux/actions/actions';

const SwipeableTemporaryDrawer = (props) => {
	const toggleDrawer = (side, open) => (event) => {
		if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
			return;
		}
		props.drawerToggle(side, open);
	};

	return (
		<div>
			<SwipeableDrawer
				open={props.drawer.left}
				onClose={toggleDrawer('left', false)}
				onOpen={toggleDrawer('left', true)}
			>
				<SidebarLeft toggleDrawer={toggleDrawer} />
			</SwipeableDrawer>
			<SwipeableDrawer
				anchor="right"
				open={props.drawer.right}
				onClose={toggleDrawer('right', false)}
				onOpen={toggleDrawer('right', true)}
			>
				<SidebarRight toggleDrawer={toggleDrawer} />
			</SwipeableDrawer>
		</div>
	);
};

const mapStateToProps = ({ drawer }) => ({ drawer });

export default connect(mapStateToProps, { drawerToggle })(SwipeableTemporaryDrawer);
