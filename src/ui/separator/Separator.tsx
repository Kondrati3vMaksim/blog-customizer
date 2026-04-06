import styles from './index.module.scss';
import clsx from 'clsx';

type SeparatorProps = {
	height?: number;
	withLine?: boolean;
};

export const Separator = ({ height = 20, withLine = true }: SeparatorProps) => {
	return (
		<div
			className={clsx({ [styles.separator]: withLine })}
			style={{
				height: `${height}px`,
				background: withLine ? '#000000' : 'transparent',
			}}
		/>
	);
};
