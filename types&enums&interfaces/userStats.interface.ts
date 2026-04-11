export interface StatsOverview {
  totalIdeas: number;
  totalComments: number;
  totalReplies: number;
  totalCategories: number;
  totalUpVotes: number;
  totalDownVotes: number;
}
export interface StatsCharts {
  pieChartData: {
    name: string;
    value: number;
  }[];
  barChartData: number[];
  monthlyChartData: number[];
}
export interface StatsTopIdedea {
  id: string;
  name: string;
  upVotes: number;
  downVotes: number;
}
export interface StatsData {
  overview: StatsOverview;
  charts: StatsCharts;
  topIdeas: StatsTopIdedea[];
}
export interface StatsResponse {
  success: boolean;
  message: string;
  data: StatsData;
}
