// {"success":true,"message":"Stats retrieved successfully","data":{"overview":{"totalUsers":2,"totalIdeas":0,"totalComments":0,"totalReplies":0,"totalCategories":0,"totalUpVotes":0,"totalDownVotes":0},"charts":{"pieChartData":[{"name":"DRAFT","value":0},{"name":"PENDING","value":0},{"name":"APPROVED","value":0},{"name":"REJECTED","value":0}],"barChartData":[],"monthlyChartData":[]},"topIdeas":[]}}

export interface AdminStatsOverview {
  totalUsers: number;
  totalIdeas: number;
  totalComments: number;
  totalReplies: number;
  totalCategories: number;
  totalUpVotes: number;
  totalDownVotes: number;
}
export interface AdminStatsCharts {
  pieChartData: {
    name: string;
    value: number;
  }[];
  barChartData: number[];
  monthlyChartData: number[];
}

export interface AdminStatsTopIdea {
  ideaId: string;
  ideaTitle: string;
  ideaStatus: string;
  ideaUpVotes: number;
  ideaDownVotes: number;
}
export interface AdminStatsData {
  overview: AdminStatsOverview;
  charts: AdminStatsCharts;
  topIdeas: AdminStatsTopIdea[];
}
export interface AdminStatsResponse {
  success: boolean;
  message: string;
  data: AdminStatsData;
}
