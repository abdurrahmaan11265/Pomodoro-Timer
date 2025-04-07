import { Card } from "@/components/ui/card";
import TaskList from "@/components/TaskList";
import PomodoroSummary from "@/components/PomodoroSummary";
import MotivationalQuote from "@/components/MotivationalQuote";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Today's Tasks</h2>
          <TaskList limit={5} />
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Pomodoro Summary</h2>
          <PomodoroSummary />
        </Card>
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Daily Motivation</h2>
        <MotivationalQuote />
      </Card>
    </div>
  );
}
