import { useEffect, useState } from 'react';
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
} from 'src/constants/articleProps';

type Settings = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
};

type ArticleParamsFormProps = {
	initialSettings: Settings;
	defaultSettings: Settings;
	onApply: (settings: Settings) => void;
};

export const ArticleParamsForm = ({
	initialSettings,
	defaultSettings,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const [formSettings, setFormSettings] = useState<Settings>(initialSettings);

	const toggleSidebar = (): void => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			const sidebar = document.querySelector(`.${styles.container}`);
			if (isOpen && sidebar && !sidebar.contains(event.target as Node)) {
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

	const handleFormChange = (field: keyof Settings, value: string) => {
		setFormSettings((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formSettings);
	};

	const resetChanges = () => {
		setFormSettings(defaultSettings);
		onApply(defaultSettings);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleSidebar} />

			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' size={31} weight={800} uppercase>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						title='шрифт'
						selected={
							fontFamilyOptions.find(
								(option) => option.value === formSettings.fontFamily
							) || fontFamilyOptions[0]
						}
						options={fontFamilyOptions}
						onChange={(option) => handleFormChange('fontFamily', option.value)}
					/>
					<RadioGroup
						name='fontSize'
						title='размер шрифта'
						selected={
							fontSizeOptions.find(
								(option) => option.value === formSettings.fontSize
							) || fontSizeOptions[0]
						}
						options={fontSizeOptions}
						onChange={(option) => handleFormChange('fontSize', option.value)}
					/>
					<Select
						title='цвет шрифта'
						selected={
							fontColors.find(
								(option) => option.value === formSettings.fontColor
							) || fontColors[0]
						}
						options={fontColors}
						onChange={(option) => handleFormChange('fontColor', option.value)}
					/>
					<Select
						title='цвет фона'
						selected={
							backgroundColors.find(
								(option) => option.value === formSettings.backgroundColor
							) || backgroundColors[0]
						}
						options={backgroundColors}
						onChange={(option) =>
							handleFormChange('backgroundColor', option.value)
						}
					/>
					<Separator />
					<Select
						title='ширина контента'
						selected={
							contentWidthArr.find(
								(option) => option.value === formSettings.contentWidth
							) || contentWidthArr[0]
						}
						options={contentWidthArr}
						onChange={(option) =>
							handleFormChange('contentWidth', option.value)
						}
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
