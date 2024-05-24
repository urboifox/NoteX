import BoardContent from "@/components/board/BoardContent";
import { getBoard } from "@/functions/boards";

export default async function BoardPage() {

	const board = await getBoard();

	return (
		<>
			<BoardContent board={board} /> 
		</>
	)
}
