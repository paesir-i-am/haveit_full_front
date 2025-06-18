import React, {lazy, Suspense} from 'react';
const Loading = () => <div>Loading...</div>
const SkinAnalysisRequest = lazy(() => import('../../skinAnalysis/pages/SkinAnalysisPage'));

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
	];
};

export default skinAnalysisRouter;