"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function AdminStats({ stats }: { stats: AdminStatsResponse }) {
  if (!stats?.success) return <div>No data</div>;

  const { overview, charts, topIdeas } = stats.data;

  // 🔹 Transform bar chart data
  const barChartData = charts.barChartData.map((value, index) => ({
    name: `Category ${index + 1}`,
    value,
  }));

  // 🔹 Transform monthly data
  const monthlyChartData = charts.monthlyChartData.map((value, index) => ({
    month: `M${index + 1}`,
    ideas: value,
  }));

  const statCards = [
    { title: "Users", value: overview.totalUsers, icon: Users },
    { title: "Ideas", value: overview.totalIdeas, icon: Lightbulb },
    { title: "Comments", value: overview.totalComments, icon: MessageSquare },
    { title: "Replies", value: overview.totalReplies, icon: Reply },
    { title: "Categories", value: overview.totalCategories, icon: Folder },
    { title: "Upvotes", value: overview.totalUpVotes, icon: ThumbsUp },
    { title: "Downvotes", value: overview.totalDownVotes, icon: ThumbsDown },
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
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={charts.pieChartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {charts.pieChartData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            {barChartData.length === 0 ? (
              <p className="text-center text-muted-foreground">
                No data available
              </p>
            ) : (
              <ResponsiveContainer>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* 🔹 Monthly Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          {monthlyChartData.length === 0 ? (
            <p className="text-center text-muted-foreground">No activity yet</p>
          ) : (
            <ResponsiveContainer>
              <BarChart data={monthlyChartData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="ideas" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
            topIdeas.map((idea) => (
              <div
                key={idea.ideaId}
                className="flex justify-between items-center border p-3 rounded-lg"
              >
                <div>
                  <p className="font-medium">{idea.ideaTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    {idea.ideaStatus}   
                  </p>
                </div>
                <div className="flex gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {idea.ideaUpVotes}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4" />
                    {idea.ideaDownVotes}
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
