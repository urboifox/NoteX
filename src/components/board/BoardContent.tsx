'use client';
import dynamic from 'next/dynamic';
import { useLayoutEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { createTLStore, defaultShapeUtils, throttle } from 'tldraw';

const Tldraw = dynamic(async () => (await import('tldraw')).Tldraw, { ssr: false })

export default function BoardContent({ board }: { board: BoardResponse | undefined }) {
	
	const [store] = useState(() => createTLStore({ shapeUtils: defaultShapeUtils }))

	const [loadingState, setLoadingState] = useState<
        | { status: "loading" }
        | { status: "ready" }
        | { status: "error"; error: string }
    >({
        status: "loading",
    });

	useLayoutEffect(() => {
		setLoadingState({ status: 'loading' })

		// Get persisted data from db
		if (board) {
			try {
				const snapshot = JSON.parse(board.snapshot)
				store.loadSnapshot(snapshot)
				setLoadingState({ status: 'ready' })
			} catch (error: any) {
				setLoadingState({ status: 'error', error: error.message }) // Something went wrong
			}
		} else {
			setLoadingState({ status: 'ready' }) // Nothing persisted, continue with the empty store
		}
		
		// Each time the store changes, run the (debounced) persist function
		const abortController = new AbortController();
		const cleanupFn = store.listen(
			throttle(async () => {
				const snapshot = store.getSnapshot();

				await fetch('/api/persist', {
					method: 'POST',
					signal: abortController.signal,
					body: JSON.stringify({ snapshot }),
					headers: {
						'Content-Type': 'application/json',
					},
				})
			}, 2000)
		)

		return () => {
			cleanupFn()
		}
	}, [store, board])

	if (loadingState.status === 'loading') {
		return (
			<div className="page">
				<Skeleton height={'calc(100vh - 4rem)'} />
			</div>
		)
	}

	if (loadingState.status === 'error') {
		return (
			<div className="page flex items-center justify-center flex-col gap-2">
				<h2>Error!</h2>
				<p>{loadingState.error}</p>
			</div>
		)
	}


	return (
		<div className="w-full h-[calc(100vh-4rem)] inset-0">
			<Tldraw store={store} inferDarkMode />
		</div>
	)
}

