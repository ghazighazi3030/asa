@@ .. @@
 import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
 import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from "recharts";
 import QuickActions from "@/components/admin/QuickActions";
+import DatabaseStatus from "@/components/admin/DatabaseStatus";

 const statsCards = [
 ]
@@ .. @@
           {/* Quick Actions */}
           <QuickActions />

+          {/* Database Status */}
+          <DatabaseStatus />
+
           {/* Today's Summary */}
           <Card className="p-6">