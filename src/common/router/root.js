import { createBrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import MainPage from '../pages/MainPage';
import memberRouter from './memberRouter';
import skinAnalysisRouter from './skinAnalysisRouter';

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
]);

export default root;
