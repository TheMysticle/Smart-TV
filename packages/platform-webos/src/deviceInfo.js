/* global navigator */
import packageJson from '../../package.json';

let cached = null;

export const getDeviceInfo = async () => {
	if (cached) return cached;

	cached = {
		platform: 'webOS',
		appVersion: packageJson.version,
		userAgent: navigator.userAgent || 'Unknown',
		screenSize: `${window.screen.width}x${window.screen.height}`,
		tvVersion: 'Unknown',
		modelName: 'Unknown'
	};

	try {
		const deviceInfoModule = await import('@enact/webos/deviceinfo');
		const device = await new Promise(resolve => deviceInfoModule.default(resolve));
		if (device) {
			cached.modelName = device.modelName || 'Unknown';
			cached.tvVersion = device.version || device.sdkVersion || 'Unknown';
		}
	} catch {
		try {
			if (typeof window.webOS !== 'undefined' && window.webOS.deviceInfo) {
				window.webOS.deviceInfo((device) => {
					if (device) {
						cached.modelName = device.modelName || 'Unknown';
						cached.tvVersion = device.version || 'Unknown';
					}
				});
			}
		} catch {
			// webOS API not available
		}
	}

	return cached;
};
