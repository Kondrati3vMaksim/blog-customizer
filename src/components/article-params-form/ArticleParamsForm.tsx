import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	defaultArticleState,
	ArticleStateType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { Text } from 'src/ui/text';

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);
	const divRef = useRef<HTMLDivElement>(null);
	useOutsideClickClose({
		isOpen: isMenuOpen,
		rootRef: divRef,
		onClose: undefined,
		onChange: () => setIsMenuOpen(false),
	});
	const handleApply = () => {
		onApply(formState);
	};
	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};
	return (
		<>
			<ArrowButton
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen(!isMenuOpen)}
			/>
			<aside
				ref={divRef}
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault(); // предотвращает перезагрузку страницы
						handleApply(); // применяем настройки
					}}>
					<Text uppercase size={31} weight={800}>
						Задайте параметры
					</Text>
					<Separator height={50} withLine={false} />
					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						onChange={(newFont) =>
							setFormState({ ...formState, fontFamilyOption: newFont })
						}
						options={fontFamilyOptions}
					/>
					<Separator height={50} withLine={false} />
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(newSize) =>
							setFormState({ ...formState, fontSizeOption: newSize })
						}
					/>
					<Separator height={50} withLine={false} />
					<Select
						selected={formState.fontColor}
						onChange={(newCol) =>
							setFormState({ ...formState, fontColor: newCol })
						}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator height={100} withLine={false} />
					<Select
						selected={formState.backgroundColor}
						onChange={(newBackColor) =>
							setFormState({ ...formState, backgroundColor: newBackColor })
						}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Separator height={50} withLine={false} />
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(newWidth) => {
							setFormState({ ...formState, contentWidth: newWidth });
						}}
					/>
					<Separator height={200} withLine={false} />
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='clear' onClick={handleReset} />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
