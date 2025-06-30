import React, {lazy, Suspense} from 'react';
const Loading = () => <div>Loading...</div>
const KakaoCallback = lazy(() => import('../components/KakaoCallback'));
const Resister = lazy(() => import('../pages/MemberRegisterPage'))

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
		{
			path:"register",
			element: (
					<Suspense fallback={<Loading />}>
						<Resister />
						</Suspense>
			),
		},
	];
};

export default MemberRouter;