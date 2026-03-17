import css from './SeasonalTheme.module.less';

const PARTICLE_COUNT = 12;
const particles = Array.from({length: PARTICLE_COUNT}, (_, i) => i);

const SeasonalTheme = ({theme}) => {
	if (!theme || theme === 'none') return null;

	return (
		<div className={`${css.overlay} ${css[theme] || ''}`}>
			{particles.map(i => (
				<div key={i} className={`${css.particle} ${css['p' + i]}`} />
			))}
		</div>
	);
};

export default SeasonalTheme;
