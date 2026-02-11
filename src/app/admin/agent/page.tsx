import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getActiveHumanSessions } from "@/lib/notion"
import { toggleAiModeAction } from "@/app/admin/actions"

export default async function AgentPage() {
    const sessions = await getActiveHumanSessions();

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">真人客服管理</h2>
                <p className="text-muted-foreground">處理目前正在進行中的真人對話請求</p>
            </div>

            <div className="grid gap-4">
                <Card>
                    <CardHeader>
                        <CardTitle>待處理對話</CardTitle>
                        <CardDescription>目前處於「真人模式」的使用者</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {sessions.length === 0 ? (
                            <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                                <p>目前沒有等待處理的真人請求</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {sessions.map(session => (
                                    <div key={session.lineUserId} className="flex items-center justify-between p-4 border rounded-lg">
                                        <div>
                                            <p className="font-medium">{session.lineUserId}</p>
                                            <p className="text-sm text-muted-foreground">最後互動: {new Date(session.lastActive).toLocaleString()}</p>
                                        </div>
                                        <form action={toggleAiModeAction.bind(null, session.lineUserId, 'Human')}>
                                            <Button type="submit" variant="outline">結束對話 (切回 AI)</Button>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
