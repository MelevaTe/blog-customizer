import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';
import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

type AppState = {
	fontFamily: string;
	fontSize: string;
	fontColor: string;
	backgroundColor: string;
	contentWidth: string;
};

const App = () => {
	const defaultSettings: AppState = {
		fontFamily: defaultArticleState.fontFamilyOption.value,
		fontSize: defaultArticleState.fontSizeOption.value,
		fontColor: defaultArticleState.fontColor.value,
		backgroundColor: defaultArticleState.backgroundColor.value,
		contentWidth: defaultArticleState.contentWidth.value,
	};

	const [pageSettings, setPageSettings] = useState<AppState>(defaultSettings);

	const applyChanges = (newSettings: AppState) => {
		setPageSettings(newSettings);
	};

	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageSettings.fontFamily,
					'--font-size': pageSettings.fontSize,
					'--font-color': pageSettings.fontColor,
					'--container-width': pageSettings.contentWidth,
					'--bg-color': pageSettings.backgroundColor,
				} as CSSProperties
			}>
			<ArticleParamsForm
				initialSettings={pageSettings}
				defaultSettings={defaultSettings}
				onApply={applyChanges}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
