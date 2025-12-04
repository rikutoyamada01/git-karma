import BrowseRepositoriesView from "@/components/dashboard/views/BrowseRepositoriesView"
import { Toaster } from "react-hot-toast" // トースターコンポーネントをインポート

export default function BrowseRepositoriesPage() {
  return (
    <>
      <BrowseRepositoriesView />
      <Toaster /> {/* トースターコンポーネントを追加 */}
    </>
  )
}
