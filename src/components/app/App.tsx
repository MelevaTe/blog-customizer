import { CSSProperties, useState } from 'react';
import { Article } from '../article/Article';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';
import { defaultArticleState } from '../../constants/articleProps';
import styles from '../../styles/index.module.scss';

type AppState = typeof defaultArticleState;

export const App = () => {
	const [pageSettings, setPageSettings] =
		useState<AppState>(defaultArticleState);

	const applyChanges = (newSettings: AppState) => {
		setPageSettings(newSettings);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': pageSettings.fontFamilyOption.value,
					'--font-size': pageSettings.fontSizeOption.value,
					'--font-color': pageSettings.fontColor.value,
					'--container-width': pageSettings.contentWidth.value,
					'--bg-color': pageSettings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={applyChanges} />
			<Article />
		</main>
	);
};
