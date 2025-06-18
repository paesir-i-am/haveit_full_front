import React, {lazy, Suspense} from 'react';
const Loading = () => <div>Loading...</div>
const KakaoCallback = lazy(() => import('../components/KakaoCallback'));

const MemberRouter = () => {
	return [
		{
			path:"kakao",
			element: (
					<Suspense fallback={<Loading />}>
						<KakaoCallback />
						</Suspense>
			),
		},
	];
};

export default MemberRouter;