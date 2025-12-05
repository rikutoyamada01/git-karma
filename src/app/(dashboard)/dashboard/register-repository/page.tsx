import RegisterRepositoryView from "@/components/dashboard/views/RegisterRepositoryView"
import { Toaster } from "react-hot-toast" // トースターコンポーネントをインポート

export default function RegisterRepositoryPage() {
  return (
    <>
      <RegisterRepositoryView />
      <Toaster /> {/* トースターコンポーネントを追加 */}
    </>
  )
}
