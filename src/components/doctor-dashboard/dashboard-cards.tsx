import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DoctorDashboardCardsProps {
  stats?: { title: string; value: string | number }[];
}

const defaultStats = [
  { title: "Total Patients", value: "150" },
  { title: "Today's Appointments", value: "8" },
  { title: "Monthly Earnings", value: "$4,200" },
  { title: "Average Rating", value: "4.9" },
];

export const DoctorDashboardCards = ({
  stats = defaultStats,
}: DoctorDashboardCardsProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
