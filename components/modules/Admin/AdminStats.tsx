"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { AdminStatsResponse } from "@/types&enums&interfaces/adminStats.interface";

import {
  Users,
  Lightbulb,
  MessageSquare,
  Reply,
  Folder,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis } from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function AdminStats({ stats }: { stats: AdminStatsResponse }) {
  if (!stats?.success || !stats.data) return <div>No data</div>;

  // ✅ safe extraction
  const overview = stats.data.overview ?? {};
  const charts = stats.data.charts ?? {};
  const topIdeas = stats.data.topIdeas ?? [];

  // ✅ transforms
  const barChartData =
    charts.barChartData?.map((value: number, index: number) => ({
      name: `Category ${index + 1}`,
      value: value ?? 0,
    })) ?? [];

  const monthlyChartData =
    charts.monthlyChartData?.map((value: number, index: number) => ({
      month: `M${index + 1}`,
      ideas: value ?? 0,
    })) ?? [];

  const statCards = [
    { title: "Users", value: overview.totalUsers ?? 0, icon: Users },
    { title: "Ideas", value: overview.totalIdeas ?? 0, icon: Lightbulb },
    {
      title: "Comments",
      value: overview.totalComments ?? 0,
      icon: MessageSquare,
    },
    { title: "Replies", value: overview.totalReplies ?? 0, icon: Reply },
    { title: "Categories", value: overview.totalCategories ?? 0, icon: Folder },
    { title: "Upvotes", value: overview.totalUpVotes ?? 0, icon: ThumbsUp },
    {
      title: "Downvotes",
      value: overview.totalDownVotes ?? 0,
      icon: ThumbsDown,
    },
  ];

 

  return (
    <div className="p-6 space-y-6">
      {/* 🔹 Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {statCards.map((item, i) => {
          const Icon = item.icon;
          return (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm">{item.title}</CardTitle>
                <Icon className="w-5 h-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{item.value}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 🔹 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie */}
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}}>
              <PieChart>
                <Pie
                  data={charts.pieChartData ?? []}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                >
                  {(charts.pieChartData ?? []).map((_, index: number) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Bar */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            {barChartData.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No data available
              </p>
            ) : (
              <ChartContainer config={{}}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Monthly */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {monthlyChartData.length === 0 ? (
            <p className="text-center text-muted-foreground">No activity yet</p>
          ) : (
            <ChartContainer config={{}}>
              <BarChart data={monthlyChartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="ideas" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* 🔹 Top Ideas */}
      <Card>
        <CardHeader>
          <CardTitle>Top Ideas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {topIdeas.length === 0 ? (
            <p className="text-muted-foreground">No top ideas yet</p>
          ) : (
            topIdeas.map((idea, i) => (
              <div
                key={i}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{idea?.name ?? "Untitled"}</p>
                  <p className="text-xs text-muted-foreground">
                    {idea?.name ?? "Unknown"}
                  </p>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {idea?.upVotes ?? 0}
                  </span>
                  
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
