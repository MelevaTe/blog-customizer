import { useEffect, useState, useRef } from 'react';
import clsx from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import styles from './ArticleParamsForm.module.scss';
import { Select } from '../../ui/select';
import { RadioGroup } from '../../ui/radio-group';
import { Text } from '../../ui/text';
import { Separator } from '../../ui/separator';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onApply: (settings: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onApply }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [formSettings, setFormSettings] =
		useState<typeof defaultArticleState>(defaultArticleState);

	const sidebarRef = useRef<HTMLDivElement | null>(null);

	const toggleSidebar = (): void => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (
				isOpen &&
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen]);

	const handleFormChange = (
		field: keyof typeof defaultArticleState,
		value: OptionType
	) => {
		setFormSettings((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formSettings);
	};

	const resetChanges = () => {
		setFormSettings(defaultArticleState);
		onApply(defaultArticleState);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />
			<aside
				ref={sidebarRef}
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={
							fontFamilyOptions.find(
								(option) => option.value === formSettings.fontFamilyOption.value
							) || fontFamilyOptions[0]
						}
						options={fontFamilyOptions}
						onChange={(option) => handleFormChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						name='fontSize'
						title='размер шрифта'
						selected={
							fontSizeOptions.find(
								(option) => option.value === formSettings.fontSizeOption.value
							) || fontSizeOptions[0]
						}
						options={fontSizeOptions}
						onChange={(option) => handleFormChange('fontSizeOption', option)}
					/>
					<Select
						title='цвет шрифта'
						selected={
							fontColors.find(
								(option) => option.value === formSettings.fontColor.value
							) || fontColors[0]
						}
						options={fontColors}
						onChange={(option) => handleFormChange('fontColor', option)}
					/>
					<Select
						title='цвет фона'
						selected={
							backgroundColors.find(
								(option) => option.value === formSettings.backgroundColor.value
							) || backgroundColors[0]
						}
						options={backgroundColors}
						onChange={(option) => handleFormChange('backgroundColor', option)}
					/>
					<Separator />
					<Select
						title='ширина контента'
						selected={
							contentWidthArr.find(
								(option) => option.value === formSettings.contentWidth.value
							) || contentWidthArr[0]
						}
						options={contentWidthArr}
						onChange={(option) => handleFormChange('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='button'
							type='clear'
							onClick={resetChanges}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
