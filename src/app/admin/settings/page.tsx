import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import RefreshButton from "./refresh-button"

export default async function SettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">系統設定</h2>
                <p className="text-muted-foreground">管理系統參數與知識庫</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>知識庫維護</CardTitle>
                    <CardDescription>
                        管理 Notion 資料同步狀態
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                        <div className="space-y-0.5">
                            <Label className="text-base">手動更新知識庫</Label>
                            <p className="text-sm text-muted-foreground">立即清除快取，重新抓取 Notion 最新資料 (預設每 24 小時自動更新)</p>
                        </div>
                        <RefreshButton />
                    </div>
                </CardContent>
            </Card>

            <div className="p-4 border rounded-lg bg-muted/50 text-sm text-muted-foreground">
                <p>💡 提示：AI 模型、系統指令與關鍵字設定已移至環境變數 (.env) 管理。</p>
            </div>
        </div>
    )
}
