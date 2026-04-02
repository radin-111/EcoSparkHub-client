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
  ideaId: string;
  ideaTitle: string;
  ideaStatus: string;
  ideaUpVotes: number;
  ideaDownVotes: number;
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
