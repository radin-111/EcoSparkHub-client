import {
  LayoutDashboard,
  Lightbulb,
  FileText,
  CreditCard,
  User,
  BarChart3,
  Clock,
  Wallet,
  Home,
  UsersRound,
} from "lucide-react";

export const userRoutes = [
  {
    path: "/",
    name: "Home",
    icon: Home,
  },
  {
    path: "/dashboard",
    name: "Statistics",
    icon: LayoutDashboard,
  },
  {
    path: "/dashboard/my-ideas",
    name: "My Ideas",
    icon: Lightbulb,
  },
  {
    path: "/dashboard/drafts",
    name: "Drafts",
    icon: FileText,
  },
  {
    name: "Transactions",
    path: "/dashboard/transactions",
    icon: CreditCard,
  },
  {
    path: "/dashboard/profile",
    name: "Profile",
    icon: User,
  },
];

export const adminRoutes = [
  {
    path: "/",
    name: "Home",
    icon: Home,
  },
  {
    path: "/admin",
    name: "Statistics",
    icon: BarChart3,
  },
  {
    path: "/admin/categories",
    name: "Categories",
    icon: FileText,
  },
  {
    path: "/admin/ideas",
    name: "Ideas",
    icon: Lightbulb,
  },
  {
    path: "/admin/pending-ideas",
    name: "Pending Ideas",
    icon: Clock,
  },
  {
    path: "/admin/transactions",
    name: "All Transactions",
    icon: Wallet,
  },
  {
    path: "/admin/create-admin",
    name: "Create Admin",
    icon: User,
  },
  {
    path: "/admin/users",
    name: "Users",
    icon: UsersRound,
  },
  {
    path: "/admin/profile",
    name: "Profile",
    icon: User,
  },
];
