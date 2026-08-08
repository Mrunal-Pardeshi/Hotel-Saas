import { ArrowUp, ArrowDown } from "lucide-react";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

function StatCard({
    title,
    value,
    description,
    trend,
    trendType,
    icon: Icon,
}) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                    {title}
                </CardTitle>

                <Icon className="size-5 text-muted-foreground" />
            </CardHeader>

            <CardContent>
                <p className="text-3xl font-bold tracking-tight">
                    {value}
                </p>

                <div className="mt-2 flex items-center gap-2 text-xs">
                    <span
                        className={
                            trendType === "positive"
                                ? "flex items-center gap-1 font-medium text-green-600"
                                : "flex items-center gap-1 font-medium text-red-600"
                        }
                    >
                        {trendType === "positive" ? (
                            <ArrowUp className="size-3" />
                        ) : (
                            <ArrowDown className="size-3" />
                        )}

                        {trend}
                    </span>

                    <span className="text-muted-foreground">
                        {description}
                    </span>
                </div>
            </CardContent>
        </Card>
    );
}

export default StatCard;