import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import MainPage from '../pages/MainPage';
import ChatbotPage from '../../chat/pages/ChatbotPage';
import memberRouter from './memberRouter';
import skinAnalysisRouter from './skinAnalysisRouter';
import { termsText } from "../constants/terms";
import { privacyText } from "../constants/privacy";

const Loading = () => <div>Loading...</div>;

const root = createBrowserRouter([
	{
		path: "/",
		element: (
				<Suspense fallback={<Loading />}>
					<MainPage />
				</Suspense>
		),
	},
	{
		path: "member",
		children: memberRouter(),
	},
	{
		path: "skin-analysis",
		children: skinAnalysisRouter(),
	},
	{
		path: "chat",
		element: (
			<Suspense fallback={<Loading />}>
				<ChatbotPage />
			</Suspense>
		),
	},
	{
		path: "terms",
		element: (
			<Suspense fallback={<Loading />}>
				{termsText}
			</Suspense>
		),
	},
	{
		path: "privacy",
		element: (
			<Suspense fallback={<Loading />}>
				{privacyText}
			</Suspense>
		),
	},
]);

export default root;
