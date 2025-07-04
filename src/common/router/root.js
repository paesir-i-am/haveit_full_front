import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import MainPage from '../pages/MainPage';
import ChatbotPage from '../../chat/pages/ChatbotPage';
import memberRouter from './memberRouter';
import skinAnalysisRouter from './skinAnalysisRouter';
import PrivacyPolicyPage from "../pages/PrivacyPolicyPage";
import TermsPolicyPage from "../pages/TermsPolicyPage";

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
				<TermsPolicyPage />
			</Suspense>
		),
	},
	{
		path: "privacy",
		element: (
			<Suspense fallback={<Loading />}>
				<PrivacyPolicyPage />
			</Suspense>
		),
	},
]);

export default root;
