import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">系統主控台</h2>
                <p className="text-muted-foreground">管理您的 AI 客服與 LINE 串接設定</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">AI 服務狀態</CardTitle>
                        <Badge variant="default" className="bg-green-500">運作中</Badge>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Enabled</div>
                        <p className="text-xs text-muted-foreground">目前正常回應訊息</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">使用的 AI 模型</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Gemini 2.5</div>
                        <p className="text-xs text-muted-foreground">Flash Model</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">等待真人回覆</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">0</div>
                        <p className="text-xs text-muted-foreground">目前無待處理對話</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>快速設定</CardTitle>
                        <CardDescription>
                            立即調整 AI 核心開關
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between space-x-2 border p-4 rounded-lg">
                            <div className="space-y-0.5">
                                <Label className="text-base">啟用 AI 自動回覆</Label>
                                <p className="text-sm text-muted-foreground">關閉後機器人將不會自動回應任何訊息</p>
                            </div>
                            <Switch checked={true} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
