import {getPlatform} from '../../platform';
import {lazy} from 'react';

const PlatformPlayer = lazy(() =>
	getPlatform() === 'tizen'
		? import('./TizenPlayer')
		: import('./WebOSPlayer')
);

const Player = (props) => <PlatformPlayer {...props} />;

export default Player;
