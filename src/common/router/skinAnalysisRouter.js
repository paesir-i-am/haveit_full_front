import React, {lazy, Suspense} from 'react';
const Loading = () => <div>Loading...</div>
const SkinAnalysisRequest = lazy(() => import('../../skinAnalysis/pages/SkinAnalysisPage'));
const SkinAnalysisResult = lazy(() => import('../../skinAnalysis/pages/SkinAnalysisResultPage'));
const SkinAnalysisHistory = lazy(() => import('../../skinAnalysis/pages/SkinAnalysisHistoryPage'));

const skinAnalysisRouter = () => {
	return [
		{
			path:"upload",
			element: (
					<Suspense fallback={<Loading />}>
						<SkinAnalysisRequest />
					</Suspense>
			),
		},
		{
			path:"result",
			element: (
					<Suspense fallback={<Loading />}>
						<SkinAnalysisResult />
					</Suspense>
			),
		},
		{
			path:"history",
			element: (
					<Suspense fallback={<Loading />}>
						<SkinAnalysisHistory />
					</Suspense>
			),
		},
	];
};

export default skinAnalysisRouter;